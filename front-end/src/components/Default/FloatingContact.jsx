import { useState } from 'react';
import './FloatingContact.css';
import { MessageOutlined } from '@ant-design/icons';

const FloatingContact = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="floating-container">
            {/* {open && ( */}
            <div className="floating-items">
                <a
                    href="https://zalo.me/0346779622"
                    target="_blank"
                    rel="noreferrer"
                    className="floating-icon floating-main"
                >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/960px-Icon_of_Zalo.svg.png" />
                </a>

                <a
                    href="https://wa.me/0763205365"
                    target="_blank"
                    rel="noreferrer"
                    className="floating-icon floating-main"
                >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/3840px-WhatsApp.svg.png" />
                </a>

                <a
                    href="https://www.facebook.com/profile.php?id=61573466010248"
                    target="_blank"
                    rel="noreferrer"
                    className="floating-icon floating-main"
                >
                    <img src="https://lucas.vn/wp-content/uploads/2023/08/logo-fb-800x800.webp" />
                </a>
            </div>
            {/* )} */}

            {/* <div
        className={`floating-main ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <MessageOutlined style={{ fontSize: 24 }} />
      </div> */}
        </div>
    );
};

export default FloatingContact;
