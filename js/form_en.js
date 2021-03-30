// ---------------> CONTACT FORM --------------->

const contact_form = document.querySelector('.contact-form')

contact_form.addEventListener('submit', e => {
    swal({
        title: "Message sent...",
        text: "We will be contacting you very soon!",
        icon: "success",
    })
    clearFields()
    e.preventDefault()
})

clearFields = () => {
    document.getElementsByName('subject')[0].value = ""
    document.getElementsByName('fullname')[0].value = ""
    document.getElementsByName('email')[0].value = ""
    document.getElementsByName('country')[0].value = ""
    document.getElementsByName('message')[0].value = ""
}