<script lang="ts">
    import favicon from '$lib/assets/favicon.svg'
    import AppSidebar from '$lib/components/app-sidebar.svelte'
    import * as Sidebar from '$lib/components/ui/sidebar/index.js'
    import '../app.css'

    let { children } = $props()
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<Sidebar.Provider>
    <AppSidebar />
    <main>
        <Sidebar.Trigger />
        {@render children?.()}
    </main>
</Sidebar.Provider>
