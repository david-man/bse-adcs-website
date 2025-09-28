type ExternalLinkType = {
    link : string
    children : string
};

function ExternalLink({link, children} : ExternalLinkType){
    return (<a href = {link} target = "_blank" className = 'text-blue-500 underline'>{children}</a>)
}
export default ExternalLink