<script lang="ts">
    import favicon from '$lib/assets/favicon.svg'
    import AppSidebar from '$lib/components/app-sidebar.svelte'
    import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js'
    import { Separator } from '$lib/components/ui/separator/index.js'
    import * as Sidebar from '$lib/components/ui/sidebar/index.js'
    import '../../app.css'

    let { children } = $props()
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<Sidebar.Provider>
    <AppSidebar />
    <Sidebar.Inset>
        <header
            class="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
            <div class="flex items-center gap-2 px-4">
                <Sidebar.Trigger class="-ml-1" />
                <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
                <Breadcrumb.Root>
                    <Breadcrumb.List>
                        <Breadcrumb.Item class="hidden md:block">
                            <Breadcrumb.Link href="#">Building Your Application</Breadcrumb.Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Separator class="hidden md:block" />
                        <Breadcrumb.Item>
                            <Breadcrumb.Page>Data Fetching</Breadcrumb.Page>
                        </Breadcrumb.Item>
                    </Breadcrumb.List>
                </Breadcrumb.Root>
            </div>
        </header>
        <div>
            <main>
                {@render children?.()}
            </main>
        </div>
    </Sidebar.Inset>
</Sidebar.Provider>
