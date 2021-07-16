<script>
  import Header from './components/Header.svelte'
  import ColorMode from './components/ColorMode.svelte'
  import FilePopup from './components/FilePopup.svelte'

  import cloneDeep from 'lodash/cloneDeep'
  import { theme, path, aliases, initialAliases } from './store'

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

  /**
   * Load aliases from stored path
   */
  const loadAliases = async () => {
    const response = await window.ipcRenderer.invoke('load-aliases', $path)

    // We assume that file doesn't exist in this case
    if (typeof response.error !== 'undefined') {
      path.set(null)
    } else {
      $initialAliases = cloneDeep(response)
      $aliases = cloneDeep(response)
    }
  }

  if ($path !== null && $path.length) {
    loadAliases()
  } else {
    $initialAliases = cloneDeep($aliases)
  }

  /**
   * Discard changes
   */
  const discardChanges = async () => {
    $aliases = cloneDeep($initialAliases)
  }

  /**
   * Save changes
   */
  const saveChanges = async () => {
    await window.ipcRenderer.invoke('save-aliases', $path, $aliases)
    const clonedAliases = cloneDeep($aliases)

    clonedAliases.map((ca) => {
      if (typeof ca.aliasChanged !== 'undefined') {
        ca.aliasChanged = false
      }
      if (typeof ca.commandChanged !== 'undefined') {
        ca.commandChanged = false
      }
    })

    $aliases = [...clonedAliases]
    $initialAliases = cloneDeep(clonedAliases)
  }

  /**
   * If alias changed
   * @param index
   * @param key
   */
  const checkIfChanged = (index, key) => {
    if (typeof $initialAliases[index] === 'undefined' || $initialAliases[index][key] !== $aliases[index][key]) {
      $aliases[index][`${key}Changed`] = true
    } else {
      $aliases[index][`${key}Changed`] = false
    }
  }

  /**
   * Total changes
   */
  const getTotalChanges = (aa) => {
    return aa.filter((a) => a.aliasChanged).length + aa.filter((a) => a.commandChanged).length
  }

  $: totalChanges = getTotalChanges($aliases)
</script>

<main class={`${$theme}-mode`}>
  {#if $path !== null && $path.length}
    <div class="header-actions">
      <Header {version} />

      <div class="actions">
        <button class="btn-default" on:click={addEmptyAlias}>Add alias</button>
        {#if totalChanges}
          <div class="right-actions">
            <button class="btn-clean" on:click={discardChanges}>Discard changes</button>
            <button class="btn-default" on:click={saveChanges}>Save {totalChanges} changes</button>
          </div>
        {/if}
      </div>
    </div>

    <ul class="table-header">
      <li style="width:40px" />
      <li style="width:200px">Alias</li>
      <li style="flex:1">Command</li>
    </ul>

    {#each $aliases as alias, index}
      <ul class="table-content">
        <li style="width:40px">{index + 1}</li>
        <li style="width:200px" class:changed={alias.aliasChanged}>
          <input
            type="text"
            spellcheck="false"
            bind:value={alias.alias}
            on:change={() => checkIfChanged(index, 'alias')}
          />
        </li>
        <li style="flex:1" class:changed={alias.commandChanged}>
          <input
            type="text"
            spellcheck="false"
            bind:value={alias.command}
            on:change={() => checkIfChanged(index, 'command')}
            class="command"
          />
        </li>
      </ul>
    {/each}
  {:else}
    <!-- FILE POPUP -->
    <FilePopup />
  {/if}

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

  .table-header,
  .table-content {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .table-content:hover {
    background-color: var(--hover);
  }

  .table-header li {
    color: var(--n800);
    font-size: 14px;
    font-weight: 600;
    border-bottom: 1px solid var(--n150);
    border-left: 1px solid var(--n150);
    line-height: 34px;
    padding: 0 10px;
    height: 34px;
    box-sizing: border-box;
  }

  .table-content li {
    border-bottom: 1px solid var(--n150);
    border-left: 1px solid var(--n150);
    color: var(--n500);
    font-size: 14px;
    font-weight: 400;
    height: 34px;
    box-sizing: border-box;
  }

  .table-content li.changed {
    background-color: var(--changed);
  }

  .table-content input {
    color: var(--n500);
    font-size: 14px;
    font-weight: 400;
    font-family: var(--font);
    width: 100%;
    box-sizing: border-box;
    border: 2px solid transparent;
    height: 34px;
    padding: 0 10px;
    outline: 0;
    box-shadow: none;
    border-radius: 4px;
    background-color: transparent;
  }

  .table-content input:focus {
    border-color: #3649e2;
  }

  .table-content input.command {
    font-family: monospace;
  }

  .table-content li:first-child {
    border-left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
