export default function Footer() {
  return (
    <footer style={{
      background: '#1a1a2e', color: '#888', textAlign: 'center',
      padding: '20px', fontSize: '14px', borderTop: '1px solid #333'
    }}>
      © {new Date().getFullYear()} ShopMERN — Built with MERN Stack ❤️
    </footer>
  );
}
