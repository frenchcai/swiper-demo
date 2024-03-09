
function fixMobile(){
    const width = 750;
    const visibleWidth = window.innerWidth;
    const scale = visibleWidth/width
    let meta = document.querySelector("meta[name=viewport]")
    const content = `width=${width},init-scale=${scale}, user-scalable=no`
    if(!meta){
        meta = document.createElement("meta")
        meta.setAttribute("name","viewport")
        document.head.appendChild(meta)
    }
    meta.setAttribute("content",content)
}

function install() {
    fixMobile()
}

export default {
    install
}