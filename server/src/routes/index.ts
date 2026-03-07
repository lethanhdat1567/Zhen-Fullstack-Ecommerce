import express from "express";
import authRouter from "./auth.routes";
import serviceCategoryRouter from "./service-category.routes";
import mediaRouter from "./upload.routes";
import serviceRouter from "./service.routes";
import productCategory from "./product-category.routes";
import productRouter from "./product.routes";
import postCategoryRouter from "./post-category.routes";
import postRouter from "./posts.routes";
import mediaCategory from "./media-category.route";
import mediaAlbum from "./media-album.route";
import mediaItems from "./media-item.route";
import translateRouter from "./translate.routes";
import contactRouter from "./contact.route";
import popupRouter from "./popup.route";
import siteRouter from "./site-setting.route";
import heroRouter from "./hero-banner.route";
import navRouter from "./nav.route";
import userRouter from "./user.route";
import dashboardRouter from "./dashboard.routes";
import cloudinaryRoute from "./cloudinary.route";
import recruitmentRouter from "./recruitment.route";
import cartRouter from "./cart.route";
import checkoutRouter from "./order.route";
import likeRouter from "./favorite.route";
import paymentRouter from "./payment.route";
import bookingRouter from "./booking.route";
import serviceAvailableRouter from "./availability.route";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/services", serviceRouter);
router.use("/service-categories", serviceCategoryRouter);
router.use("/product-categories", productCategory);
router.use("/products", productRouter);
router.use("/post-categories", postCategoryRouter);
router.use("/posts", postRouter);
router.use("/media-categories", mediaCategory);
router.use("/media-albums", mediaAlbum);
router.use("/media-items", mediaItems);
router.use("/upload", mediaRouter);
router.use("/translate", translateRouter);
router.use("/contact", contactRouter);
router.use("/popups", popupRouter);
router.use("/site-setting", siteRouter);
router.use("/hero-banners", heroRouter);
router.use("/navs", navRouter);
router.use("/users", userRouter);
router.use("/dashboard", dashboardRouter);
router.use("/cloudinary", cloudinaryRoute);
router.use("/recruitments", recruitmentRouter);
router.use("/cart", cartRouter);
router.use("/orders", checkoutRouter);
router.use("/favorites", likeRouter);
router.use("/payment", paymentRouter);
router.use("/bookings", bookingRouter);
router.use("/service-available", serviceAvailableRouter);

// Health route
router.get("/health", (req, res) => {
    res.success("Welcome to API");
});

export default router;
