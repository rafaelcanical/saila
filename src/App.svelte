<script>
  import Header from './components/Header.svelte'
  import ColorMode from './components/ColorMode.svelte'

  import { theme, aliases } from './store'

  export let version

  /**
   * Add a new empty alias to create a new command
   */
  const addEmptyAlias = () => {
    $aliases = [
      ...$aliases,
      {
        alias: '',
        command: ''
      }
    ]
  }
</script>

<main class={`${$theme}-mode`}>
  <div class="header-actions">
    <Header {version} />

    <div class="actions">
      <button class="btn-default" on:click={addEmptyAlias}>Add alias</button>
      <div class="right-actions">
        <button class="btn-clean">Discard changes</button>
        <button class="btn-default">Save changes</button>
      </div>
    </div>
  </div>

  <table>
    <thead>
      <th align="left" width="20px" />
      <th align="left" width="200px">Alias</th>
      <th align="left">Command</th>
    </thead>
    <tbody>
      {#each $aliases as alias, index}
        <tr>
          <td align="center">{index + 1}</td>
          <td><input type="text" spellcheck="false" value={alias.alias} /></td>
          <td><input type="text" spellcheck="false" value={alias.command} class="command" /></td>
        </tr>
      {/each}
    </tbody>
  </table>

  <!-- COLOR MODE CHANGE -->
  <ColorMode />
</main>

<style>
  main {
    /* header height + actions height */
    padding-top: calc(36px + 46px);
    background-color: var(--n0);
    min-height: calc(100vh - 36px - 46px);
  }

  .header-actions {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  .actions {
    height: 46px;
    background-color: var(--n50);
    border-bottom: 1px solid var(--n150);
    display: flex;
    align-items: center;
    padding: 0 9px;
  }

  .btn-default {
    background-color: var(--n0);
    border: 1px solid var(--n200);
    font-weight: 600;
    font-size: 12px;
    color: var(--n600);
    border-radius: 4px;
    padding: 7px 10px;
    cursor: pointer;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  }

  .btn-default:hover {
    background-color: var(--n50);
    border-color: var(--n300);
  }

  .btn-clean {
    background-color: var(--n50);
    border: 1px solid var(--n50);
    font-weight: 600;
    font-size: 12px;
    color: var(--n500);
    border-radius: 4px;
    padding: 7px 10px;
    cursor: pointer;
  }

  .btn-clean:hover {
    background-color: var(--n150);
    border-color: var(--n150);
    color: var(--n700);
  }

  .right-actions {
    margin-left: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  table th {
    color: var(--n800);
    font-size: 14px;
    font-weight: 600;
    border-bottom: 1px solid var(--n150);
    border-left: 1px solid var(--n150);
    line-height: 34px;
    padding: 0 10px;
  }

  table th:first-child {
    border-left: 0;
  }

  table td {
    border-bottom: 1px solid var(--n150);
    border-left: 1px solid var(--n150);
    color: var(--n500);
    font-size: 14px;
    font-weight: 400;
  }

  table td input {
    color: var(--n500);
    font-size: 14px;
    font-weight: 400;
    font-family: var(--font);
    width: calc(100% + 2px);
    box-sizing: border-box;
    border: 2px solid transparent;
    line-height: 34px;
    padding: 0 10px;
    outline: 0;
    box-shadow: none;
    border-radius: 4px;
    margin: -1px;
    background-color: transparent;
  }

  table td input:focus {
    border-color: #3649e2;
  }

  table td input.command {
    font-family: monospace;
  }

  table td:first-child {
    border-left: 0;
  }
</style>
