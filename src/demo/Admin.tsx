"use client";

import { useState, useEffect } from "react";
import Tile, { TileStatus } from "./Tile";

export default function Admin() {
  const [status, setStatus] = useState<TileStatus>("Loading");
  const [canOpenAdmin, setCanOpenAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/admin") // Assuming there's a ping endpoint to check server status
      .then((response) => {
        if (response.ok) {
          setStatus("Success");
          setCanOpenAdmin(true);
        } else {
          setStatus("Error");
          setCanOpenAdmin(false);
        }
      })
      .catch(() => {
        setStatus("Error");
        setCanOpenAdmin(false);
      });
  }, []);

  let subtitle = status === "Error" ? "There seems to be an issue" : "";
  let message =
    status === "Success"
      ? "Remult Admin is an autogenerated UI for managing your data."
      : "Failed to connect to Remult server.";

  return (
    <Tile title="Admin" status={status} subtitle={subtitle} width="half">
      <p>{message}</p>
      <div className="button-row">
        {canOpenAdmin && (
          <a className="button" href="/api/admin">
            Open Admin
          </a>
        )}
      </div>
    </Tile>
  );
}
