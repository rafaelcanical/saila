<script>
  import { aliases, path } from '../store'

  /**
   * Save path on localstorage
   */
  const savePath = async () => {
    const response = await window.ipcRenderer.invoke('load-aliases', filePath)
    if (typeof response.error !== 'undefined' && response.error) {
      alert("This file doesn't exist. Check the file path again.")
    } else {
      $aliases = response
      path.set(filePath)
    }
  }

  let filePath = ''
</script>

<div class="file-wrapper" style="-webkit-app-region: drag">
  <div class="file-content">
    <input type="text" placeholder="~/.zshrc" spellcheck="false" bind:value={filePath} />
    <button class="btn-default" on:click={savePath}>Save</button>
  </div>
</div>

<style>
  .file-wrapper {
    background-color: var(--n50);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .file-content {
    padding: 20px;
    background-color: var(--n0);
    border: 1px solid var(--n100);
    border-radius: 7px;
    width: 500px;
    display: flex;
  }

  .file-content input {
    flex: 1;
    margin-right: 10px;
    border: 1px solid var(--n150);
    background-color: transparent;
    border-radius: 4px;
    padding: 0 10px;
    outline: 0;
    font-family: var(--font);
    font-size: 14px;
    color: var(--n600);
  }

  .file-content input:focus {
    border-color: var(--n300);
  }
</style>
