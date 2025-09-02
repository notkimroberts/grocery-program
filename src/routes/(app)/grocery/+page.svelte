<script lang="ts">
    import * as Table from '$lib/components/ui/table/index.js'
    import type { PageProps } from './$types'

    let { data }: PageProps = $props()
    let { neighbors } = $derived(data)
</script>

<Table.Root>
    <Table.Header>
        <Table.Row>
            <Table.Head>ID</Table.Head>
            <Table.Head>First</Table.Head>
            <Table.Head>Last</Table.Head>
            <Table.Head>Phone</Table.Head>
            <Table.Head>Metadata</Table.Head>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        <Table.Row>
                {#each neighbors as { id, firstName, lastName, phone, metadata }}
                <Table.Cell>{id}</Table.Cell>
                <Table.Cell>{firstName}</Table.Cell>
                <Table.Cell>{lastName}</Table.Cell>
                <Table.Cell>{phone}</Table.Cell>
                <Table.Cell>{metadata}</Table.Cell>
            </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>
