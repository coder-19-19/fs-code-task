$( function() {

  const doc = $(document)
  const zoomBtn = $('.zoom-btn')
  const zoomInput = $('.zoom input')

  zoomBtn.on('click',() => {
    $('.container').css('font-size',zoomInput.val()  + 'px')
  })
  doc.on('keyup','input',e => {
    if(e.keyCode == 13){
      $('.createChild').click()
    }
  })

  doc.on('click','.createChild',e => {
    let parent = $(e.target).parent().parent()
    let text = parent.children('span').children('input').val().trim()
    if(text && text != ''){
      createChild(parent,text)
    }
  })

  doc.on('click','.removeElement',e => {
    let parent = $(e.target).parent().parent().parent()

    if(parent.parent().children('li').length > 1){
      removeElement(parent,true)
    }
    else{
      removeElement(parent)
    }
  })

  doc.on('click','.closeEditInput',e => {
    let parent = $(e.target).parent().parent()
    let text = parent.children('span').children('input').attr('data-text')
    createChild(parent,text)
  })

  doc.on('click','.fa-pencil',e => {
    let parent = $(e.target).parent().parent()
    let text = parent.children('span').text()
    if(text && text != '') {
      parent.html(`
          <span>
            <input type="text" data-text="${text}" placeholder="Name" value="${text}">
          </span>
          <div class="operations">
            <i class="fa fa-remove closeEditInput"></i>
            <i class="fa fa-check createChild"></i>
          </div>
    `)
    }
  })

  doc.on('click','.createInput',e => {
    let parent = $(e.target).parent().parent().parent()

    if(parent.children('ul').length){
      createInput(parent,true)
    }
    else{
      createInput(parent)
    }
  })

  const createChild = (element,text) => {
    element.html(`
      <span>${text}</span>
      <div>
        <i class="fa fa-plus createInput"></i>
        <i class="fa fa-pencil"></i>
      </div>
    `)
    if(!element.parent().hasClass('ui-widget-content')){
      element.children('div').append('<i class="fa fa-remove removeElement"></i>')
    }
  }

  const removeElement = (element,hasChild = false) => {
    if(hasChild){
      element.remove()
    }
    else{
      element.parent().remove()
    }
  }

  const createInput = (element,hasChild = false) => {
      if(hasChild){
        element.children('ul').append(`
        <li>
            <label>
                <span>
                    <input type="text" placeholder="Name">
                </span>  
                <div class="operations">
                    <i class="fa fa-remove removeElement"></i>
                    <i class="fa fa-check createChild"></i>
                </div>       
            </label>
       </li>
    `)
      }
      else{
        element.append(`
        <ul>
            <li>
                <label>
                    <span>
                        <input type="text" placeholder="Name">
                    </span>  
                    <div class="operations">
                        <i class="fa fa-remove removeElement"></i>
                        <i class="fa fa-check createChild"></i>
                    </div> 
                </label>
            </li>
        </ul>

    `)
      }
      $('input').focus()
  }

  $( ".ui-widget-content" ).draggable();
});