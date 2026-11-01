"use client";

import { Client, type IMessage } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";

import { getAccessToken } from "@/lib/auth/AuthProvider";
import { usePolling } from "@/lib/hooks/usePolling";
import { config } from "@/lib/config";
import type { EmergencyEvent } from "@/types/api";

/** ws(s)://host/api/v1/ws a partir de la URL de la API. */
function wsUrl(): string {
  return config.apiUrl.replace(/^http/, "ws").replace(/\/$/, "") + "/ws";
}

/**
 * Se suscribe a un tópico STOMP y llama a `onEvent` con cada aviso.
 * Devuelve si la conexión está activa, para bajar la frecuencia del polling de respaldo.
 * Pasar `topic = null` desactiva la suscripción.
 */
export function useLiveEvents(topic: string | null, onEvent: (event: EmergencyEvent) => void): boolean {
  const [connected, setConnected] = useState(false);
  const handler = useRef(onEvent);

  useEffect(() => {
    handler.current = onEvent;
  });

  useEffect(() => {
    const token = getAccessToken();
    if (!topic || !token) return;

    const client = new Client({
      brokerURL: wsUrl(),
      connectHeaders: { Authorization: `Bearer ${token}` },
      reconnectDelay: 5000,
      heartbeatIncoming: 20000,
      heartbeatOutgoing: 20000,
      onConnect: () => {
        setConnected(true);
        client.subscribe(topic, (message: IMessage) => {
          try {
            handler.current(JSON.parse(message.body) as EmergencyEvent);
          } catch {
            // mensaje inesperado: se ignora
          }
        });
      },
      onWebSocketClose: () => setConnected(false),
      onStompError: () => setConnected(false),
    });
    client.activate();
    return () => {
      setConnected(false);
      void client.deactivate();
    };
  }, [topic]);

  return connected;
}

/** Intervalo de polling según haya o no conexión en vivo. */
export function pollingInterval(connected: boolean): number {
  return connected ? config.fallbackPollingMs : config.pollingMs;
}

/**
 * Datos que se refrescan al llegar un aviso por WebSocket, con polling de
 * respaldo (rápido sin conexión en vivo, lento con ella).
 */
export function useLiveResource<T>(fetcher: () => Promise<T>, topic: string | null, enabled = true) {
  const refreshRef = useRef<() => void>(() => {});
  const connected = useLiveEvents(enabled ? topic : null, () => refreshRef.current());
  const state = usePolling(fetcher, pollingInterval(connected), enabled);

  useEffect(() => {
    refreshRef.current = () => void state.refresh();
  });

  return { ...state, live: connected };
}
