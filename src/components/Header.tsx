import { useNavigate } from 'react-router-dom';

interface IProps {
    title: string;
}

const Header = ({ title }: IProps) => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <>
            <header className="header">
                <div className="wrapper-btn">
                    <button onClick={logout}>Выйти</button>
                </div>
                <h1>{title}</h1>
            </header>
        </>
    );
};

export default Header;