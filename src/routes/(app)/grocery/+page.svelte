<script lang="ts">
    import * as Table from '$lib/components/ui/table/index.js'
    import type { PageProps } from './$types'

    let { data }: PageProps = $props()
    let { neighbors } = $derived(data)
</script>

<Table.Root>
    <Table.Header>
        <Table.Row>
            {#each Object.keys(neighbors[0] ?? {}) as key}
                <Table.Head>{key}</Table.Head>
            {/each}
        </Table.Row>
    </Table.Header>
    <Table.Body>
        {#each neighbors as { id, name, age, address, nationality, phone, createdAt, updatedAt }}
            <Table.Row>
                <Table.Cell>{id}</Table.Cell>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{phone}</Table.Cell>
                <Table.Cell>{address}</Table.Cell>
                <Table.Cell>{nationality}</Table.Cell>
                <Table.Cell>{createdAt}</Table.Cell>
                <Table.Cell>{updatedAt}</Table.Cell>
            </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>
