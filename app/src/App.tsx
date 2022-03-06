import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Card from "./Component";

interface ComponentProps {
  id: string;
  onDelete: (id: string) => void;
}

function Component({ id, onDelete }: ComponentProps) {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Card
          id="1"
          content="Hello Card Content"
          title="Title"
          onDelete={() => {}}
        />
      </header>
    </div>
  );
}

export default Component;
