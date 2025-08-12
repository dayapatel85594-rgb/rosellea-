import{a as v,r as i,j as e}from"./index-Easth5WQ.js";import{N as l,F as n}from"./Footer-BbzoLKkH.js";import{u as f}from"./useProductData-XQbwnYis.js";import{A as y}from"./aos-M1cqTs4Y.js";function F(){var x;const{id:h}=v(),{products:u,loading:p}=f(),s=u.find(a=>a._id===h),[c,j]=i.useState(""),[o,g]=i.useState(""),[r,d]=i.useState(1),[m,b]=i.useState(0);if(i.useEffect(()=>{y.init({duration:1e3,easing:"ease-out-cubic",once:!0})},[]),p)return e.jsxs(e.Fragment,{children:[e.jsx(l,{}),e.jsx("div",{className:"container py-5 mt-5",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-lg-6",children:e.jsx("div",{className:"loading-skeleton",style:{height:"600px",borderRadius:"20px"}})}),e.jsxs("div",{className:"col-lg-6",children:[e.jsx("div",{className:"loading-skeleton",style:{height:"40px",marginBottom:"20px",borderRadius:"8px"}}),e.jsx("div",{className:"loading-skeleton",style:{height:"60px",marginBottom:"20px",borderRadius:"8px"}}),e.jsx("div",{className:"loading-skeleton",style:{height:"100px",marginBottom:"20px",borderRadius:"8px"}})]})]})}),e.jsx(n,{})]});if(!s)return e.jsxs(e.Fragment,{children:[e.jsx(l,{}),e.jsxs("div",{className:"container py-5 mt-5 text-center",children:[e.jsx("h2",{children:"Product not found"}),e.jsx("p",{children:"The product you're looking for doesn't exist."})]}),e.jsx(n,{})]});const N=()=>{if(!c){alert("Please select a size");return}console.log("Added to cart:",{product:s,selectedSize:c,selectedColor:o,quantity:r})};return e.jsxs(e.Fragment,{children:[e.jsx(l,{}),e.jsx("div",{className:"container py-5 mt-5",children:e.jsxs("div",{className:"row g-5",children:[e.jsx("div",{className:"col-lg-6","data-aos":"fade-right",children:e.jsxs("div",{className:"product-gallery",children:[e.jsx("div",{className:"main-image mb-3",children:e.jsx("img",{src:s.image,alt:s.title,className:"img-fluid rounded-3",style:{width:"100%",height:"600px",objectFit:"cover"}})}),s.images&&s.images.length>1&&e.jsx("div",{className:"thumbnail-images d-flex gap-2",children:s.images.map((a,t)=>e.jsx("img",{src:a,alt:`${s.title} ${t+1}`,className:`thumbnail ${t===m?"active":""}`,onClick:()=>b(t),style:{width:"80px",height:"80px",objectFit:"cover",borderRadius:"8px",cursor:"pointer",border:t===m?"2px solid var(--accent-rose)":"2px solid transparent"}},t))})]})}),e.jsx("div",{className:"col-lg-6","data-aos":"fade-left",children:e.jsxs("div",{className:"product-info",children:[e.jsx("h1",{className:"product-title mb-3",children:s.title}),e.jsxs("div",{className:"product-price mb-4",children:[e.jsxs("span",{className:"h2 text-primary fw-bold",children:["$",(x=s.price)==null?void 0:x.toFixed(2)]}),s.originalPrice&&s.originalPrice>s.price&&e.jsxs("span",{className:"text-muted text-decoration-line-through ms-3",children:["$",s.originalPrice.toFixed(2)]})]}),e.jsx("p",{className:"product-description mb-4 lead",children:s.description}),s.sizes&&s.sizes.length>0&&e.jsxs("div",{className:"size-selection mb-4",children:[e.jsx("h5",{className:"mb-3",children:"Size"}),e.jsx("div",{className:"size-options d-flex gap-2 flex-wrap",children:s.sizes.map(a=>e.jsx("button",{className:`btn size-btn ${c===a?"selected":""}`,onClick:()=>j(a),children:a},a))})]}),s.colors&&s.colors.length>0&&e.jsxs("div",{className:"color-selection mb-4",children:[e.jsx("h5",{className:"mb-3",children:"Color"}),e.jsx("div",{className:"color-options d-flex gap-2 flex-wrap",children:s.colors.map(a=>e.jsx("button",{className:`btn color-btn ${o===a?"selected":""}`,onClick:()=>g(a),children:a},a))})]}),e.jsxs("div",{className:"quantity-selection mb-4",children:[e.jsx("h5",{className:"mb-3",children:"Quantity"}),e.jsxs("div",{className:"quantity-controls d-flex align-items-center",children:[e.jsx("button",{className:"btn btn-outline-secondary",onClick:()=>d(Math.max(1,r-1)),children:"-"}),e.jsx("span",{className:"mx-3 fw-bold",children:r}),e.jsx("button",{className:"btn btn-outline-secondary",onClick:()=>d(r+1),children:"+"})]})]}),e.jsxs("div",{className:"product-actions mb-4",children:[e.jsx("button",{className:"btn btn-luxury btn-lg w-100 mb-3",onClick:N,children:"Add to Collection"}),e.jsxs("div",{className:"product-features",children:[e.jsxs("div",{className:"feature-item d-flex align-items-center mb-2",children:[e.jsx("i",{className:"fas fa-shipping-fast text-success me-2"}),e.jsx("span",{children:"Free shipping on orders over $100"})]}),e.jsxs("div",{className:"feature-item d-flex align-items-center mb-2",children:[e.jsx("i",{className:"fas fa-undo text-info me-2"}),e.jsx("span",{children:"30-day return policy"})]}),e.jsxs("div",{className:"feature-item d-flex align-items-center",children:[e.jsx("i",{className:"fas fa-shield-alt text-warning me-2"}),e.jsx("span",{children:"Authentic guarantee"})]})]})]}),e.jsx("div",{className:"product-details",children:e.jsx("div",{className:"accordion",id:"productAccordion",children:e.jsxs("div",{className:"accordion-item",children:[e.jsx("h2",{className:"accordion-header",children:e.jsx("button",{className:"accordion-button",type:"button","data-bs-toggle":"collapse","data-bs-target":"#details",children:"Product Details"})}),e.jsx("div",{id:"details",className:"accordion-collapse collapse show","data-bs-parent":"#productAccordion",children:e.jsx("div",{className:"accordion-body",children:e.jsxs("ul",{className:"list-unstyled",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Material:"})," ",s.material||"Premium quality fabric"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Care:"})," ",s.care||"Machine wash cold, hang dry"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Origin:"})," Ethically sourced"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Fit:"})," True to size"]})]})})})]})})})]})})]})}),e.jsx(n,{}),e.jsx("style",{jsx:!0,children:`
        .size-btn, .color-btn {
          border: 2px solid var(--accent-rose);
          background: transparent;
          color: var(--text-primary);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          transition: all var(--transition-smooth);
        }
        
        .size-btn:hover, .color-btn:hover,
        .size-btn.selected, .color-btn.selected {
          background: var(--accent-rose);
          color: white;
        }
        
        .quantity-controls button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        
        .feature-item {
          font-size: 0.9rem;
          color: var(--text-primary);
          opacity: 0.8;
        }
        
        .accordion-button {
          background: var(--bg-primary);
          color: var(--text-primary);
          border: none;
          font-weight: 600;
        }
        
        .accordion-button:not(.collapsed) {
          background: var(--accent-rose);
          color: white;
        }
      `})]})}export{F as default};
