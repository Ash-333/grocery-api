const Cart=require('../database/Cart')

const addToCart=async(req,res)=>{
    try {
        const cartData=req.body
        const cart=new Cart(cartData)
        await cart.save()
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({msg:`${error}`})
    }
}

const getCart=async(req,res)=>{
    try {
        const userId=req.params.userId
        const cart=await Cart.findOne({userId})
        if(!cart){
            res.status(400).json({msg:'Cart not found'})
        }
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({msg:`${error}`})
    }
}

const addItemToCart=async(req,res)=>{
    try {
        const userId=req.params.userId

        const cart=await Cart.findOne({userId})
        if(!cart){
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        const items=req.body
        console.log(items)
        cart.items.push(items)
        cart.total+=items.price*items.quantity
        
        await cart.save()
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({msg:`${error}`})
    }
}

const updateQuantity=async(req,res)=>{
    try {
        const userId=req.params.userId
        const productId=req.params.productId
        
        const cart=await Cart.findOne({userId})
        if(!cart){
            res.status(400).json({msg:'Cart not found'})
        }

        const quantity=req.body.quantity
        const item=cart.items.find((item)=>item.productId==productId)

        if(item){
            item.quantity=quantity
            cart.total+=cart.items.reduce((total,item)=>total+item.price*item.quantity,0)
        }

        await cart.save()
        res.status(200).json(cart)
    } catch (error) {
    }
}

const deleteItem=async(req,res)=>{
    try {
        const userId=req.params.userId
        const productId=req.params.productId
        
        const cart=await Cart.findOne({userId})
        if(!cart){
            res.status(400).json({msg:'Cart not found'})
        }
        
        const itemIndex=cart.items.findIndex((item)=>item.productId==productId)
        
        if(itemIndex >=0){
            const removeItem=cart.items.splice(itemIndex,1)[0];
            cart.total-=removeItem.price*removeItem.quantity
        }
        
        await cart.save()
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({msg:`${error}`})        
    }
}

module.exports={addToCart,getCart,addItemToCart,updateQuantity,deleteItem}