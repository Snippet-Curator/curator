<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import * as Tabs from '$lib/components/ui/tabs/index';
	import { getImportState } from './import.svelte';

	const importState = getImportState();
</script>

{#if importState.uploadStatus == 'in progress' || importState.uploadStatus == 'completed'}
	<div class="card card-border p-golden-md m-golden-xl grid grid-cols-12">
		<div class="col-span-3">Progress</div>
		<div class="col-span-9 flex items-center gap-x-2">
			<progress class="progress h-4" value={importState.progress} max="100"></progress>
			{importState.progress}%
		</div>

		<div class="col-span-3">Status</div>
		<div class="col-span-9">{importState.uploadStatus}</div>
		<div class="col-span-3">Current File</div>
		<div class="col-span-9 text-left">{importState.currentFile}</div>
	</div>
{/if}

<section class="gap-golden-xl m-golden-xl card grid grid-cols-1">
	{#if importState.uploadStatus == 'in progress' || importState.uploadStatus == 'completed'}
		<Tabs.Root value="success">
			<Tabs.List class="grid w-full grid-cols-2">
				<Tabs.Trigger value="success">Success</Tabs.Trigger>
				<Tabs.Trigger value="errors">Errors</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="success">
				<ScrollArea class="h-100">
					<table class="table-zebra table">
						<thead>
							<tr>
								<th></th>
								<th>File or URL</th>
							</tr>
						</thead>
						<tbody>
							{#each importState.successFiles as item, index}
								<tr>
									<th>{index + 1}</th>
									<td>{item}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</ScrollArea>
			</Tabs.Content>
			<Tabs.Content value="errors">
				<ScrollArea class="h-100">
					<table class="table-zebra table">
						<thead>
							<tr>
								<th></th>
								<th>File name or URL</th>
								<th>Error Message</th>
							</tr>
						</thead>
						<tbody>
							{#each importState.failureFiles as item, index}
								<tr>
									<th>{index + 1}</th>
									<td>{item.name}</td>
									<td>{item.error}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</ScrollArea>
			</Tabs.Content>
		</Tabs.Root>
	{/if}
</section>
