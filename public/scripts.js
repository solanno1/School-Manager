const currentPage = window.location.pathname
const menuItens = document.querySelectorAll("header .links a")

for (item of menuItens) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}




function paginate(selectedPage, totalPages) {
    let pages = [],
        oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

        if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
            if (oldPage && currentPage - oldPage > 2) {
                pages.push("...")
            }
            if (oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }
            pages.push(currentPage)
            oldPage = currentPage
        }
    }
    return pages
}

const pagination = document.querySelector(".pagination");

function createPagination(pagination){
    const filter = pagination.dataset.filter
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const pages = paginate(page, total)

    let elements = ""

    for(let page of pages){
        if(String(page).includes("...")){
            elements += `<span>${page}</span>`            
        }else{
            if(filter){
                elements += `<a href="?page=${page}&filter=${filter}">${page}`
            }else{
                elements += `<a href="?page=${page}">${page}</a>`
            }
        }
    }



    
    // const menuLenght = pages.length
    // for (let i = 0; i<menuLenght; i++){
    //     if(pages[i] === page){
    //         console.log(pages)
    //         pages[i].className = "active"
    //     }
    // }
    
    // console.log(page)S
    

    pagination.innerHTML = elements
}

if(pagination){
    createPagination(pagination)
}