<script>
  import { invoke } from "@tauri-apps/api";

  let message = "";
  $: message;

  function call_tauri() {
    invoke("called_from_js").then((m) => (message = m));
  }
</script>

<h1 class="underline">Welcome to Skitty</h1>
<button class="bg-slate-500" on:click={call_tauri}>Call Tauri</button>
<div>
  {message}
</div>
