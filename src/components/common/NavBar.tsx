import React from "react";
import styles from "./styles/NavBar.module.css";

function NavBar() {
  return (
    <div>
      <nav className={styles.navbar}>
        <div>
          <ul>
            <img
              className={styles.logo}
              src="./logo.png"
              alt="logo"
              width={80}
              height={80}
            />
            <div className={styles.searchbox}>
              <input type="text" placeholder="Search" />
              <button>
                <img
                  className={styles.search}
                  src="./Search.png"
                  alt="search"
                />
              </button>
            </div>

            <div className={styles.allpro}>
              <img
                className={styles.allproduct}
                src="./Squared Menu.png"
                alt="allproduct"
                width={40}
                height={40}
              />
              <a href="/collection">All Product</a>
            </div>
            <div className={styles.credit}>
              <img
                className={styles.dollar}
                src="./Dollar Coin.png"
                alt="dollar"
                width={25}
                height={25}
              />
              <a href="#">Credit</a>
            </div>
            <div className={styles.accounts}>
              <img
                className={styles.user}
                src="./User.png"
                alt="User"
                width={25}
                height={25}
              />
              <a href="#">Account</a>
            </div>
            <div className={styles.carts}>
              <button>
                <img
                  className={styles.cart}
                  src="./Buying.png"
                  alt="buy"
                  width={25}
                  height={25}
                />
                <a href="#">Cart : 0</a>
              </button>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
