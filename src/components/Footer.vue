

<template>
  <div class="footer-container">
    <div class="footer-outer">
      <div class="footer-inner">
        <div id="piveau-footer" class="p-5">
          <div class="footer-item grid1-8">
            <img width="300" height="58" src="https://ki-allianz.de/wp-content/uploads/2024/09/ki-logo-footer.png" class="attachment-large size-large wp-image-7265" alt="KI-Allianz Logo weiss">
          </div>
          <div class="footer-item grid15-25">
            <div class="footer-link-container">
              <ul>
                <li class="mb-2">
                  <a href="https://ki-allianz.de/newsletter/" class="footer-link">
                  <span class="underlined">
                    Newsletter
                  </span>
                    <span class="icon-arrow-link">
                  </span>
                  </a>
                </li>
                <li class="mb-2">
                  <a href="https://de.linkedin.com/company/ki-allianz" class="footer-link">
                  <span class="underlined">
                    LinkedIn
                  </span>
                    <span class="icon-arrow-link">
                  </span>
                  </a>
                </li>
                <li class="mb-2">
                  <a href="https://ki-allianz.de/stellenausschreibung-studentische-hilfskraft-unterstuetzung-community-management-und-eventorganisation/" class="footer-link">
                  <span class="underlined">
                    Karriere
                  </span>
                    <span class="icon-arrow-link">
                  </span>
                  </a>
                </li>
                <li class="mb-2">
                  <a href="https://ki-allianz.de/styleguide/" class="footer-link">
                  <span class="underlined">
                    Styleguide
                  </span>
                    <span class="icon-arrow-link">
                  </span>
                  </a>
                </li>
              </ul>
              <ul>
                <li class="mb-2">
                  <a href="https://ki-allianz.de/presse/" class="footer-link">
                  <span class="underlined">
                    Presse
                  </span>
                    <span class="icon-arrow-link">
                  </span>
                  </a>
                </li>
                <li class="mb-2">
                  <a href="https://ki-allianz.de/kontakt/" class="footer-link">
                  <span class="underlined">
                    Kontakt
                  </span>
                    <span class="icon-arrow-link">
                  </span>
                  </a>
                </li>
                <li class="mb-2">
                  <router-link to="/imprint" class="footer-link">
                  <span class="underlined">
                    Impressum
                  </span>
                    <span class="icon-arrow-link">
                  </span>
                  </router-link>
                </li>
                <li class="mb-2">
                  <router-link to="/privacypolicy" class="footer-link">
                  <span class="underlined">
                    Datenschutz
                  </span>
                    <span class="icon-arrow-link">
                  </span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>


          <div class="footer-item grid1-12">
            <div class="newsletter-container">
              <h2>KI-Allianz Newsletter</h2>
              <ul>
                <li>Top KI-Events erleben</li>
                <li>KI-Erfolgsgeschichten entdecken</li>
                <li>Netzwerke aufbauen & erweitern</li>
              </ul>

              <a href="https://ki-allianz.de/newsletter/">Jetzt zum Newsletter anmelden</a>
            </div>
          </div>

          <div class="footer-item gridx">
            <h4>
              <!-- Language box -->
              <div
                v-if="useLanguageSelector"
              >
                <div class="input-group">
                  <language-selector :languageObject="languageObject" :override-locale="overrideLocale"></language-selector>
                </div>
              </div>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import LanguageSelector from "@/components/LanguageSelector.vue";

export default {
  name: 'PiveauFooter',
  components: {LanguageSelector},
  inheritAttrs: false,
  props: {
    useLanguageSelector: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isNuxt: false
    }
  }
};
</script>

<style lang="scss">
// @import '../styles/footer.scss';
@import '../styles/custom_theme.scss';

.footer-container {
  padding-top: 6.5rem;
}

.footer-outer {
  padding-left: 6.6rem !important;
  padding-right: 6.6rem !important;

  background-image: url("https://ki-allianz.de/wp-content/uploads/2024/09/ki-footer-background-no-shape.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.footer-outer::before {
  content: url('https://ki-allianz.de/wp-content/uploads/2024/08/shape_curve_top_grey.svg');
  max-width: 1920px;
  width: 101% !important;
  height: auto;
  margin-top: -1px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.footer-inner {
  padding-top: clamp(5.5rem,3.3077rem + 9.7436vw,15rem) !important;
  padding-bottom: 5.5rem;
}

.grid1-12 {
  grid-column: 1/12;
}

.grid1-8 {
  grid-column: 1/8;
}

.grid15-25 {
  grid-column: 15/25;
}

.gridx {
  grid-column: 15/25;

  align-content: end;
}

.footer-item {
}

.newsletter-container {
  background-color: #FFFFFF21;
  backdrop-filter: blur(12.5px);

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-radius: 20px;
  padding: 32px 40px 32px 40px;

  list-style-type:circle;

  h2 {
    font-size: 39.06px;
    font-weight: 700;
    font-style: normal;
    line-height: 125%;
  }

  ul {
    padding-left: 27px;
    gap: 3px;
    display: flex;
    flex-direction: column;
  }

  li {
    font-size: clamp(1.125rem, 1.0962rem + 0.1282vw, 1.25rem);
  }

  a {
    background: white;
    color: #000AFA !important;

    font-size: 1.125rem;
    text-transform: none;
    font-style: normal;
    text-decoration: none;
    text-align: center;
    line-height: 125%;
    border-style: none;
    border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
    padding: 0.75rem 1rem 0.75rem 1rem;
    cursor: pointer;
    font-family: "Nunito Sans", Sans-serif;

    transition: .2s !important;

    &:hover {
      background: #000AFA;
      color: white !important;
      text-decoration: none;
    }
  }
}

#piveau-footer {
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(24, 1fr);
  grid-template-rows: repeat(1, 1fr);
  gap: 7.5rem 2rem;
  justify-content: start;

  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #FFF;
  text-align: left;

  overflow: hidden;
}

.w-33 {
  min-width: 33%;
}

/***********************************
	LAYOUT & TYPOGRAPHY
***********************************/

#piveau-footer .container {
  max-width: 1340px !important;
}

/***********************************
	TOP FOOTER
***********************************/
#piveau-footer #footer_first {
  background: $secondary-blue;
  padding-top: 35px;
  padding-bottom: 20px;
}

#piveau-footer #footer_first .region-footer-first-left,
#piveau-footer #footer_first .region-footer-first-middle,
#piveau-footer #footer_first .region-footer-first-right {
  padding-bottom: 25px;
}

#piveau-footer #footer_first {
  font-size: 1em;
  font-weight: normal;
  color: $primary;
}

#piveau-footer .btn.btn-footer {
  background-color: $primary;
  border-color: $primary;
  // border-radius: 4px;
}

#piveau-footer .btn.btn-footer:hover {
  background-color: #196fd2;
  border-color: #196fd2;
}

/***********************************
BOTTOM SITE BRANDING
***********************************/
#piveau-footer #footer_first #block-sitebranding {
  margin-bottom: 25px;
}

// #piveau-footer #footer_first #block-sitebranding > a {
//   float: left;
// }
// #piveau-footer #footer_first #block-sitebranding img {
//   height: 60px;
//   margin-right: 10px;
// }
#piveau-footer #footer_first #block-sitebranding .site-branding__text a {
  line-height: 60px;
  font-size: 20px;
  color: #0F62AE;
  text-transform: uppercase;
  font-weight: 300;
}

#piveau-footer #footer_first #block-edp3-branding .site-branding__text a strong {
  font-weight: bold;
}

/***********************************
FUNDED BY NOTICE
***********************************/
#piveau-footer #footer_first #block-fundedby img.fundedby {
  height: 40px;
  width: 60px;
  float: none;
  margin-right: 10px;
}

#piveau-footer #footer_first #block-fundedby p {
  margin: 0;
  line-height: 40px;
  font-size: 14px;
  color: $primary;
}


/***********************************
	HELP US IMPROVE
***********************************/
#piveau-footer #footer_first #block-helpusimprove {
  margin-top: 25px;
  margin-bottom: 15px;
}

#piveau-footer #footer_first #block-helpusimprove p {
  line-height: 20px;
}

#piveau-footer #footer_first #block-helpusimprove p a {
  color: $primary;
  font-size: 14px;
}

/***********************************
FOLLOW US
***********************************/
#piveau-footer #footer_first #block-followuson ul {
  margin: 25px 0 0 0;
  padding: 0;
}

#piveau-footer #footer_first #block-followuson ul li {
  list-style-type: none;
  overflow: hidden;
}

#piveau-footer #footer_first #block-followuson ul li a {
  color: $primary;
  line-height: 20px;
  display: inline-block;
  margin-bottom: 11px;
  position: relative;
}

#piveau-footer #footer_first #block-followuson ul li a:hover {
  color: #196fd2;
  text-decoration: none;
}

#piveau-footer #footer_first #block-followuson ul li a:before {
  font-family: "Font Awesome 5 Brands";
  font-weight: 900;
  margin-right: 10px;
  font-size: 30px;
  position: relative;
  top: 5px;
}

/***********************************
RESPONSIVE
***********************************/
@media screen and (min-width: 768px) and (max-width:1090px) {
  #piveau-footer #footer_first #block-sitebranding .site-branding__text a {
    line-height: 1;
    width: 150px;
    padding-top: 13px;
    padding-left: 5px;
    display: inline-block;
  }

  #piveau-footer #footer_first #block-fundedby p:nth-child(2) {
    line-height: 1;
    width: 180px;
    padding-top: 5px;
  }
}

@media screen and (max-width: 715px) {
  #piveau-footer #footer_first #block-sitebranding .site-branding__text a {
    line-height: 1;
    width: 150px;
    padding-top: 13px;
    padding-left: 5px;
    display: inline-block;
  }
}

.underlined {
  fill: #fff;
  text-align: left !important;
  text-transform: none;
  font-style: normal;
  font-weight: 600 !important;
  font-family: "Nunito Sans", Sans-serif !important;
  line-height: 156%;
  font-size: 18px;
  box-sizing: border-box;
  display: inline-block;
  text-decoration: inherit;
  position: relative !important;

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    height: 1.5px;
    width: 100%;
    transition: .2s !important;
    z-index: 1 !important;
    background: white;
  }
}

.footer-link {
  color: white;
  gap: 10px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  text-decoration: inherit;
  line-height: 156%;
  text-transform: none;
  font-style: normal;
  text-align: left !important;
  width: fit-content;
  &:hover {
    color: #FFED00 !important;

    text-decoration: none;

    .underlined {
      &::after {
        background: #FFED00 !important;
      }
    }

    .icon-arrow-link {
      &::before {
        color: #FFED00 !important;
      }
    }
  }
}

.icon-arrow-link {
  font-family: 'kiallianz_icomoon' !important;
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  font-size: 18px;
  color: #FFFFFF !important;
  text-align: left !important;
  fill: #fff;
  margin-top: 4px;

  &::before {
    color: #FFFFFF !important;
    font-weight: 600 !important;
    top: 3px !important;
    position: relative !important;
    content: "\e900";
    font-family: 'kiallianz_icomoon' !important;
    font-style: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    font-size: 18px;
  }
}

.footer-link-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;

  ul {
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 2rem;

    list-style: none;
    margin: 0;
    padding: 0;
  }
}
</style>
