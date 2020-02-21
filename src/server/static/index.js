


const __main = () => {
        const e = document.querySelector.bind(document)
        const btn = e('.example-btn')
        btn.addEventListener('click', function(e) {
            console.log('hello world')
            fetch('/example', {
                method: 'GET',
            })
        })
}

__main()