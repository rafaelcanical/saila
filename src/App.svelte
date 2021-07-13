<script>
  import Header from './components/Header.svelte'
  import ColorMode from './components/ColorMode.svelte'

  export let version
  export let aliases

  let mode = 'light'

  /**
   * Change color mode
   */
  const changeColorMode = () => {
    mode = mode === 'light' ? 'dark' : 'light'
  }
</script>

<main class={`${mode}-mode`}>
  <Header {version} />
  <!-- Actions here -->

  <table>
    <thead>
      <th><input type="checkbox" /></th>
      <th align="left">Alias</th>
      <th align="left">Command</th>
    </thead>
    <tbody>
      {#each aliases as alias}
        <tr>
          <td><input type="checkbox" /></td>
          <td>{alias.alias}</td>
          <td><code>{alias.command}</code></td>
        </tr>
      {/each}
    </tbody>
  </table>

  <!-- COLOR MODE CHANGE -->
  <ColorMode {changeColorMode} {mode} />
</main>

<style>
  table th {
    color: var(--n800);
    font-size: 12px;
    font-weight: 600;
  }

  table td {
    color: var(--n500);
    font-size: 12px;
    font-weight: 400;
  }
</style>
