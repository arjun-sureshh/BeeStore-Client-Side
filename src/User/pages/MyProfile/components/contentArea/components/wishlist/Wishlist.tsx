import React, { useState, useEffect } from "react";
import styles from "./Wishlist.module.css";
import WishlistProducts from "./components/whishlistProducts/WishlistProducts";
import axios from "axios";
import { existingUserData } from "../../../../../../components/types/types";
import { useNavigate } from "react-router";

interface WishlistItem {
  varientId: string;
  productName: string;
  image: string;
  sellingPrice: string;
  MRP: string;
  offerPer: string;
  productRating: string;
  totalOrders: string;
  minimumQty: number;
  productstock: number;
}

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [existingUserData, setExistingUserData] =
    useState<existingUserData | null>(null);
const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = sessionStorage.getItem("user");
      if (!token) {
        console.log("No user signed in");
        setExistingUserData(null);
        setWishlistItems([]);
        navigate("/User/Login");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/Login`, {
          headers: {
            "x-auth-token": token,
          },
        });
        console.log("Logged user response:", response.data);
        setExistingUserData(response.data);
      } catch (error: any) {
        console.error("Error fetching user details:", {
          message: error.message,
          response: error.response?.data,
        });
        setExistingUserData(null);
        setWishlistItems([]);
        sessionStorage.removeItem("user");
      }
    };

    fetchUserDetails();
  }, []);

  // Fetch wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!existingUserData?._id) {
        console.log("No user logged in, skipping wishlist fetch");
        setWishlistItems([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/api/wishlist`, {
          params: { userId: existingUserData._id },
        });
        console.log("Wishlist fetch response:", JSON.stringify(response.data, null, 2)); // Debug
        // Extract data array from response
        const data = Array.isArray(response.data.data) ? response.data.data : [];
        setWishlistItems(data);
      } catch (error: any) {
        console.error("Error fetching wishlist:", {
          message: error.message,
          response: error.response?.data,
        });
        setWishlistItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, [existingUserData]);

  // Delete from wishlist
  const deleteFromWishlist = async (productvaraintId: string) => {
    if (!existingUserData?._id) {
      console.log("No user logged in, cannot delete");
      return;
    }

    if (isDeleting) {
      console.log("Deletion in progress, please wait");
      return;
    }

    setIsDeleting(productvaraintId);
    try {
      const payload = {
        varientId: productvaraintId,
        userId: existingUserData._id,
      };
      console.log("Wishlist delete payload:", payload);

      const response = await axios.delete(
        `${API_URL}/api/wishlist`,
        { data: payload },
      );
      console.log("Wishlist delete response:", response.data);

      if (response.data.success) {
        setWishlistItems((prev) =>
          prev.filter((item) => item.varientId !== productvaraintId),
        );
        console.log(`Removed variant ${productvaraintId} from wishlist`);
      } else {
        console.error("Failed to delete from wishlist:", response.data.message);
      }
    } catch (error: any) {
      console.error("Wishlist delete error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    } finally {
      setIsDeleting(null);
    }
  };

  const handleAddToCart = async (
    productvaraintId: string,
    productstock: number,
    minimumQty: number,
  ) => {
    if (!existingUserData?._id) {
      console.log("No user logged in, redirecting to login");
      return navigate("/User/Login");
    }
    if (!productvaraintId) {
      console.error("No product Varaint Id");
      return;
    }
    if (productstock <= 0) {
      return alert("This product is out of stock.");
    }

    try {
      const response = await axios.post(`${API_URL}/api/cart`, {
        cartQty: minimumQty,
        variantId: productvaraintId,
        userId: existingUserData._id,
      });

      if (response.status === 201) {
        navigate("/User/Cart");
      } else if (
        response.status === 400 &&
        response.data.message === "This product variant is already in your cart"
      ) {
        navigate("/User/Cart");
      }
    } catch (error: any) {
      console.error(
        "Error adding to cart:",
        error.response?.data || error.message,
      );
      alert(error.response?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.wishlistName}>
        My Wishlist{" "}
        <span className={styles.wishlistCount}>({wishlistItems.length})</span>
      </div>
      <div className={styles.wishlistProducts}>
        {isLoading ? (
          <div>Loading wishlist...</div>
        ) : wishlistItems.length === 0 ? (
          <div>No items in wishlist</div>
        ) : (
          wishlistItems.map((item, index) => {
            const imageUrl = item.image
              ? `${API_URL}${item.image}`
              : "/default-image.jpg";
            console.log("Rendering item:", item.varientId, "Image URL:", imageUrl); // Debug
            return (
              <WishlistProducts
                key={`${item.varientId}-${index}`}
                img={imageUrl}
                productName={item.productName || "Unknown Product"}
                productRating={item.productRating || "0"}
                totalOrders={item.totalOrders || "0"}
                sellingPrice={item.sellingPrice || "0"}
                MRP={item.MRP || "0"}
                offerPer={item.offerPer || "0"}
                productvaraintId={item.varientId}
                minimumQty={item.minimumQty}
                productstock={item.productstock}
                deleteFromWishlist={deleteFromWishlist}
                handleAddToCart={handleAddToCart}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Wishlist;