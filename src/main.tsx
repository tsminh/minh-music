import ReactDOM from "react-dom/client";
import App from "./App";
import VConsole from "vconsole";
import { Buffer } from "buffer";

(globalThis as any).Buffer = Buffer;

new VConsole();

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
