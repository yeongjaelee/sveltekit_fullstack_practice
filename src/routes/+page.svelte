<script>
    import {page} from "$app/stores";
    import {browser} from "$app/environment";
    import {enhance} from "$app/forms";
    $:{
        console.log($page.form)
        if($page.form && browser){
            alert($page.form.message)
        }
    }
</script>


<div class="h-screen flex flex-col justify-center">
    <form class="border shadow rounded p-8 flex flex-col w-96 space-y-4" method="POST" action="/"
          use:enhance={()=>{
              return ({result, update})=>{
                  update()
                  alert(result.data.message)

              }
          }}
    >
        <label for="email">이메일</label>
        <input type="email" name="email" id="email" class="border p-2">
        <label for="password">비밀번호</label>
        <input type="password" name="password" id="password" class="border p-2">
        <a href="/register" class="border rounded p-3">회원가입</a>
        <button class="border rounded bg-blue-500 tex-white p-3 w-fit ml-auto">로그인</button>
    </form>
</div>