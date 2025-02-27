/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/HeroSection.jsx", "./src/components/NavBar.jsx", "./src/components/OrganisationIndividualChoice.jsx", "./src/components/NavLinks.jsx", "./src/components/LoginButton.jsx","./src/components/Logo.jsx"],
  theme: {
    extend: {
      colors: {
        navbarBg: "#2e3b35",
        navbarText: "#c2bbba",
        maingreen:"#B1FF8F",
      },
      height: {
        '60vh': '60vh',
      },
      margin:{
        '10':'10%',
        '8':'8%'
      },
      screens: {
        xs: { max: '329px' },// Customize the xs breakpoint to 330px
        
      },
    },
  },
  plugins: [],
}

