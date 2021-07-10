<script>
  export let version
  export let aliases
</script>

<main>
  <header>
    <h1>Saila {version}</h1>
  </header>
  <ul>
    {#each aliases as alias}
      <li>{alias.alias} - <code>{alias.command}</code></li>
    {/each}
  </ul>
</main>
