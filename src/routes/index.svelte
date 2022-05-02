<script>
  import { invoke } from "@tauri-apps/api";

  let message = '';
  $: message;

  function call_tauri() {
    invoke("called_from_js").then((m) => (message = m));
  }
</script>

<h1 class="underline">Welcome to Skitty</h1>
<p>
  {message}
  <button on:click={call_tauri}>Call Tauri</button>
</p>
