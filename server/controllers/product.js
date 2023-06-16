/**
 * Date: 12/06/2023
 * Subject: E-cummers Project 
 * Auth: Ismile Sardar
 */
//packeg require
const fs = require("fs");
const slugify = require("slugify");
const product = require("../models/product");
const Order = require("../models/order");
// braintree getaway
let braintree = require("braintree");
//send grid
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);

//module scaffolded
const proCon = {};

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

//created product
proCon.creat = async (req, res) => {
  try {
    // console.log("field***>",req.fields)
    // console.log("files+++>",req.files)
    // 1. destructure name, email, password from req.body
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    //photo file destructure
    const { photo } = req.files;
    // console.log("PHOTO====>",photo)
    //validation
    switch (true) {
      case !name.trim():
        return res.status(404).json({ error: "Name is required!" });
      case !description.trim():
        return res.status(404).json({ error: "Description is required!" });
      case !price.trim():
        return res.status(404).json({ error: "Price is required!" });
      case !category.trim():
        return res.status(404).json({ error: "Category is required!" });
      case !quantity.trim():
        return res.status(404).json({ error: "Quantity is required!" });
      case !shipping.trim():
        return res.status(404).json({ error: "Shipping is required!" });
      case photo && photo.size > 5e6: //5000000
        return res
          .status(404)
          .json({ error: "Image should be less than 5mb!" });
    }
    //product creat
    const newProduct = new product({ ...req.fields, slug: slugify(name) });
    //photo
    if (photo) {
      newProduct.photo.data = fs.readFileSync(photo.path);
      newProduct.photo.contentType = photo.type;
    }
    //data save
    await newProduct.save();
    //user response
    res.status(201).json({ product: newProduct });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
//get all product
proCon.list = async (req, res) => {
  try {
    //{path:"catagory",strictPopulate: false}
    const allProduct = await product
      .find({})
      .populate("category") //strictPopulate
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    //user response
    res.status(200).json({ All: allProduct });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};
//read singel product
proCon.read = async (req, res) => {
  try {
    const sinProduct = await product
      .findOne({ slug: req.params.slug })
      .populate({ path: "category", strictPopulate: false }) //strictPopulate
      .select("-photo");
    //user response
    res.status(200).json({ Single: sinProduct });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};
//read with photo
proCon.photo = async (req, res) => {
  try {
    //find by id
    const sinProduct = await product
      .findById(req.params.productId)
      .select("photo");
    //user respons Cross-Origin-Resource-Policy: same-site | same-origin | cross-origin

    if (sinProduct.photo.data) {
      res.set("Content-Type", sinProduct.photo.contentType);
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
      return res.status(200).send(sinProduct.photo.data);
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};
//delete product
proCon.remove = async (req, res) => {
  try {
    //find by id nad Delete
    const remove = await product
      .findByIdAndDelete(req.params.productId)
      .select("-photo");
    //user respons
    res.status(200).json(remove);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};
//update product
proCon.update = async (req, res) => {
  try {
    // 1. destructure name, email, password from req.body
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    //photo file destructure
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name?.trim():
        return res.status(404).json({ error: "Name is required!" });
      case !description?.trim():
        return res.status(404).json({ error: "Description is required!" });
      case !price?.trim():
        return res.status(404).json({ error: "Price is required!" });
      case !category?.trim():
        return res.status(404).json({ error: "Category is required!" });
      case !quantity?.trim():
        return res.status(404).json({ error: "Quantity is required!" });
      case !shipping?.trim():
        return res.status(404).json({ error: "Shipping is required!" });
      case photo && photo.size > 5e6: //5000000
        return res.status(404).json({ error: "Imeg should be less than 5mb!" });
    }
    //product update
    const productUpdate = await product.findByIdAndUpdate(
      req.params.productId,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    //photo
    if (photo) {
      productUpdate.photo.data = fs.readFileSync(photo.path);
      productUpdate.photo.contentType = photo.type;
    }
    //data save
    await productUpdate.save();
    //user respons
    res.status(201).json({ UpdateProduct: productUpdate });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
// filtered Products
proCon.filteredProducts = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    //make arge array
    let args = {};
    //chaking
    if (checked.length > 0) {
      args.category = checked;
    }
    if (radio.length) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }
    // console.log(args);
    //data filter
    const filterProduct = await product.find(args);
    //user respons
    res.status(200).json(filterProduct);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};
//product count
proCon.productCount = async (req, res) => {
  try {
    //produnt count
    const countProduct = await product.find({}).estimatedDocumentCount();
    // console.log(countProduct)
    //user Respons
    res.status(200).json({ Total: countProduct });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};
//page list product
proCon.pageProducts = async (req, res) => {
  try {
    const parPage = 2;
    const page = req.params.page ? req.params.page : 1;
    //product find
    const selectProduct = await product
      .find({})
      .select("-photo")
      .skip((page - 1) * parPage)
      .limit(parPage)
      .sort({ createdAt: -1 });
    //user respons
    res.status(200).json(selectProduct);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};
//keyword Searsh
proCon.productsSearch = async (req, res) => {
  try {
    const { keyword } = req.params;
    //product find
    const selectProduct = await product
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    //user respons
    res.status(200).json(selectProduct);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};
//Related Product search
proCon.relatedProduct = async (req, res) => {
  try {
    const { productId, categoryId } = req.params;
    //product find
    const selectProduct = await product
      .find({
        category: categoryId,
        _id: { $ne: productId },
      })
      .select("-photo")
      .populate("category")
      .limit(3);
    //user respons
    res.status(200).json(selectProduct);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};

// breantree client token
proCon.getToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, (err, respons) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(respons);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// processPayment
proCon.processPayment = async (req, res) => {
  try {
    let { nonce, cart } = req.body;

    let total = 0;
    cart?.map((i) => {
      total += i.price;
    });

    await gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (err, result) {
        if (err) {
          res.status(500).send(err);
          return;
        } else {
          // create order
          new Order({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();

          res.json({ ok: true });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// orderStatus
proCon.orderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    let { status } = req.body;
    //update status
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate("buyer", "email name");

    //send E-mail
    const msg = {
      to: order["buyer"]["email"],
      from: process.env.EMAIL_FROM, // Use the email address or domain you verified above
      subject: "Order Status",
      html: `<h1>Hi ${order.buyer.name}, Your order's status is: <span style="color:red;">${order.status}</span></h1>
      <p>Visit <a href="${process.env.CLIENT_URL}/dashboard/user/orders">your dashboard</a> for more details</p>`,
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.log(error);
    }

    res.json(order);
  } catch (error) {
    console.log(error);
  }
};

//module exports
module.exports = proCon;
