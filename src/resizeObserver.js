const observeChanges = (entries) =>{

    var ro = new ResizeObserver( entries => { 
        for (let entry of entries) { 
          const cr = entry.contentRect; 
          const p = entry.target.getBoundingClientRect();  
          //console.log('Element:', entry.target); 
         // console.log(`Element size: ${cr.width}px x ${cr.height}px`); 
         // console.log(`Element padding: ${cr.top}px ; ${cr.left}px`); 
         
          if(entry.target.id){ 
            console.log("id:" + entry.target.id)
            console.log(`Element width: ${p.width}px Element height:${p.height}px`); 
            console.log(`Element padding: ${cr.top}px ; ${cr.left}px`); 
            entry.target.style.height = 100+'em';
            console.log(entry.target.style.height)
            
           // entry.target.width = p.width*2;
            entry.target.style.borderRadius =
          Math.max(0, 250 - entry.contentRect.width) + 'px'; 
          } 
         
        } 
      }); 
      // Observe one or multiple elements  
         list.forEach(function(element){ 
          
          ro.observe(element);
         })

}
exports.observeChanges = observeChanges;

