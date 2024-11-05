import { criarGrafico, getCSS } from "./common.js"

async function redesSociaisFavoritasMinhaEscola() {
    const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=rSe23zaQC7gOvWgFJbdtPaqh7ewsO5hQmusYOeqdorTRN8C25vVV3BicsPoS6HS3jnJY9NHhy_pNZj6prQdxDH3305Mro8vNm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPvESZ9fvnAeFWqfIvIacdoRZcVMZ-nDSydw9_0gseo2TN3y60rOTtwDBCYnKQf6yIqgf8yOzNfccjP633C9VnHmUmPZvRBJY9z9Jw9Md8uu&lib=MCARBaBtNBMHKiEwMeRap3j6V_G7SlGWF'
    const res = await fetch(url)
    const dados = await res.json()

    const redesSociais = dados.slice(1).map(redes => redes[1])

    const contagemRedesSociais = redesSociais.reduce((acc, redesSociais) => {
        acc[redesSociais] = (acc[redesSociais] || 0) + 1
        return acc
    }, {})

    const valores = Object.values(contagemRedesSociais)
    const labels = Object.keys(contagemRedesSociais)
    
    const data = [
        {
          values: valores,
          labels: redes,
          type: 'pie',
          textinfo: 'label+percent'
        }
      ]
      
      const layout = {
        plot_bgcolor: getCSS('--bg-color'),
        paper_bgcolor: getCSS('--bg-color'),
        height: 700,
        title: {
          text: 'Redes sociais que as pessoas da minha escola mais gostam',
          x: 0,
          font: {
            color: getCSS('--primary-color'),
            family: getCSS('--font'),
            size: 30
          }
        },
        legend: {
          font: {
            color: getCSS('--primary-color'),
            size: 16
          }
        }
      }
      
      criarGrafico(data, layout)
}

redesSociaisFavoritasMinhaEscola()