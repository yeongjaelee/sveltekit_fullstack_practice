<script lang="ts">
    import {page} from "$app/stores";
    import {enhance} from "$app/forms";

    $: {
        console.log($page.data)
    }
</script>
<div class="h-screen flex flex-col pt-8">
    <div>
        유저 : {$page.data.user.email}
    </div>
    <form class="mt-8" method="POST" action="?/create"
          use:enhance={()=>{
              return ({result, update}) => {
                  update()
                  alert(result.data.message)
              }
          }}
    >
        <input type="text" class="border rounded w-full p-2" name="contents">
    </form>
    <div class="mt-8 space-y-2">
        {#each $page.data.todoList as todo}
            <div class="p-4 border rounded shadow">
                {todo.contents}
                {#if todo.isDone}
                    ok
                {/if}
            </div>

            <div class="flex ml-auto space-x-2">
                <form method="POST" action="?/finish" use:enhance>
                    <input type="hidden" value={todo.id} name="id">
                    <button class="border p-2 text-blue">
                        완료
                    </button>
                </form>

            </div>
        {/each}
    </div>
</div>