const xhr = new XMLHttpRequest()
xhr.open('post','/xxxx')
xhr.onreadystatechange = function (){
  if(xhr.readyState === 4 && xhr.status === 200){
    console.log(xhr.responseText);
  }
}
xhr.send('a=1&b=2')
