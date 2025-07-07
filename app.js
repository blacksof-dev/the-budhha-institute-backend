require("dotenv").config();
const express = require("express");
const app = express();
const contactRouter = require("./router/contactRouter");
const addressRouter = require("./router/addressRouter");
const newsRouter = require("./router/newsRouter");
const broucherRouter = require("./router/broucherRouter");
const caseStudyRouter = require("./router/caseStudyRouter");
const updateRouter = require("./router/UpdateRouter");
const GovtInstitueRouter = require("./router/govtInstitueRouter");
const FoundationRouter = require("./router/foundationRouter");
const CsoNetwork = require("./router/CsoRouter");
const MapDetails = require("./router/mapdeatilsRouter");
const cardRouter = require("./router/cardRouter");
const razorpayRouter = require("./router/paymentRouter");
const testimonialVideo = require("./router/testimonialVideoRouter");
const { authenticationToken } = require("./middleware/Authentication");
const StoryGloryRouter = require("./router/storeGloriesRouter");
const testimonialContent = require("./router/testimonialContentRouter");
const Graph = require("./router/GraphRouter");
const AwardsRouter = require("./router/AwardsRoute");
const Products = require("./router/productRouter");
const Newsletter = require("./router/NewsLetterRouter");
const subtabs = require("./router/subtabsRouter")
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
var methodOverride = require("method-override");
const AdminRouter = require("./router/adminRouter");
const ErrorHandler = require("./utils/ErrorHandler");
const MarkdownImgUrl = require("./router/MarkdownImageUrlRouter");
app.options("*", cors({ origin: true }));




//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.use(cookieParser());
// app.use(
//   cors({
//     credentials: true,
//     origin: "https://thebuddhainstitute.org/",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   })
// );
app.use(cors({
  origin: 'https://thebuddhainstitute.org', // allow your frontend domain
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  credentials: true,
}));

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on this port 3000");
});

app.get("/index", (req, res) => {
  res.render("edit.ejs");
});

 app.use(express.json({ limit: '10mb' })); // increase JSON body limit
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/template', express.static('public/template'));

//For routing end points

app.use("/api/contact", contactRouter);

// localhost:8080/api/contact/create
// localhost:8080/api/contact/show
// localhost:8080/api/contact/delete/:id

app.use("/api/address", addressRouter);

// localhost:8080/api/address/create
// localhost:8080/api/address/show
// localhost:8080/api/address/edit/:id
// localhost:8080/api/address/delete/:id

app.use("/api/newsArticle", newsRouter);
// localhost:8080/api/newsArticle/new
// localhost:8080/api/newsArticle/create
// localhost:8080/api/newsArticle/edit/:id
// localhost:8080/api/newsArticle/delete/:id

app.use("/api/brochure", broucherRouter);
// localhost:8080/api/brochure/allbroucher
// localhost:8080/api/brochure/create
// localhost:8080/api/brochure/edit/:id
// localhost:8080/api/brochure/delete/:id

app.use("/api/caseStudy", caseStudyRouter);
// localhost:8080/api/caseStudy/allcaseStudy
// localhost:8080/api/caseStudy/create
// localhost:8080/api/caseStudy/delete/:id
// localhost:8080/api/caseStudy/edit/:id

app.use("/api/updates", updateRouter);
// localhost:8080/api/updates/allupdates
// localhost:8080/api/updates/create
// localhost:8080/api/updates/delete/:id
// localhost:8080/api/updates/edit/:id

app.use("/api/govtInstitue", GovtInstitueRouter);
//localhost:8080/api/GovtInstitue/show
//localhost:8080/api/GovtInstitue/create
//localhost:8080/api/GovtInstitue/delete/:id

app.use("/api/foundation", FoundationRouter);
//localhost:8080/api/foundation/show
//localhost:8080/api/foundation/create
//localhost:8080/api/foundation/delete/:id

app.use("/api/csonetwork", CsoNetwork);
//localhost:8080/api/csonetwork/show
//localhost:8080/api/csonetwork/create
//localhost:8080/api/csonetwork/delete/:id

app.use("/api/mapDetails", MapDetails);
//localhost:8080/api/mapDetails/show
//localhost:8080/api/mapDetails/create
//localhost:8080/api/mapDetails/edit/:id
//localhost:8080/api/mapDetails/delete/:id

app.use("/api/admin", AdminRouter); //
//localhost:8080/api/admin/register
//localhost:8080/api/admin/all-admin
//localhost:8080/api/admin/login
//localhost:8080/api/admin/logout
//localhost:8080/api/admin/edit-admin
//localhost:8080/api/admin/delete-admin/:id
//localhost:8080/api/admin/add-admin
//localhost:8080/api/admin/forgot-password
//localhost:8080/api/admin/new-password
//localhost:8080/api/admin/set-password"

app.use("/api/card", cardRouter);
//localhost:8080/api/card/create
//localhost:8080/api/card/show/?role=mentorpool
//localhost:8080/api/card/delete/id
//localhost:8080/api/card/edit

app.use("/api/payment", razorpayRouter);
//localhost:8080/api/payment/order
//localhost:8080/api/payment/verify

app.use("/api/testimonialContent", testimonialContent);

app.use("/api/testimonialVideo", testimonialVideo);
//localhost:3000/api/testimonialVideo/create
//localhost:3000/api/testimonialVideo/show
//localhost:3000/api/testimonialVideo/edit/:id

app.use("/api/newsletter", Newsletter);
//localhost:3000/api/newsletter/create

app.use("/api/storyglory", StoryGloryRouter);
//localhost:8080/api/storyglory/create
//localhost:8080/api/storyglory/delete/:id
//localhost:8080/api/storyglory/edit/:id

app.use("/api/awards", AwardsRouter);
//localhost:8080/api/awards/create
//localhost:8080/api/awards/show
//localhost:8080/api/awards/delete/:id
//localhost:8080/api/awards/edit/:id

app.use("/api/products", Products);
//localhost:8080/api/products/create
//localhost:8080/api/products/show
//localhost:8080/api/products/delete/:id
//localhost:8080/api/products/edit/:id

app.use("/api/graphdata", Graph);
//localhost:3000/api/graphdata/create

app.use("/api/markdown/imageurl", MarkdownImgUrl);

app.use("/api/subtab",subtabs)

app.all("*", (req, res, next) => {
  return next(new ErrorHandler("Page not found", 404));
});

app.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json({ success: "fail", message: err.message || "Internal Server Error" });
});

