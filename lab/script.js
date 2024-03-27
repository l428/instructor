/* eslint-disable max-len */

const seatMap = {};

function renderProgram(record) {
  const { program, environment } = record;
  const { id, name } = program;
  const {
    id: eId, status: envStatus, author, publish, healthchecks,
  } = environment;
  const {
    instanceStatus: { status },
    repo: { status: repoStatus, url },
    zipcodeFDM: { status: zipCodeFdmStatus, url: zipCodeFdmUrl, code: zipCodeFdmCode },
    creditCardDAMAsset:
      { status: creditCardDAMAssetStatus, url: creditCardDAMAssetUrl, code: creditCardDAMAssetCode },
    creditCardImage:
      { status: creditCardImageStatus, url: creditCardImageUrl, code: creditCardImageCode },
    weFinanceLogo: { status: weFinanceLogoStatus, url: weFinanceLogoUrl, code: weFinanceLogoCode },
    edsStatus: { status: edsStatus, url: edsUrl, code },
    ccForm: { status: ccFormStatus, url: ccFormUrl, code: ccFormCode },
    edsCCForm: {
      status: edsCCFormStatus, url: edsCCFormUrl, code: edsCCFormCode, valid,
    },
    edsConfig: { status: edsConfigStatus, url: edsConfigUrl, value: edsConfigCode },
  } = healthchecks;
  const number = name.replace('L428 ', '');
  const seatNo = `seat${number}`;
  const publishFormUrl = `${publish}/content/forms/af/we-finance-credit-card-application.html`;
  seatMap[seatNo] = {
    gitUrl: `https://github.com/l428/${seatNo}`,
    author: `${author}`,
    username: `L428+${number}@adobeeventlab.com`,
    publishFormUrl,
    gitClone: `git clone https://github.com/l428/${seatNo}.git
    cd ${seatNo}
    code .
    aem up`,
    edsFormUrl: `https://main--${seatNo}--l428.hlx.live/content/forms/af/we-finance-credit-card-application`,
  };
  const aemId = `p${id}-e${eId}`;
  const row = `<tr>
        <td>
            <a href="https://experience.adobe.com/#/@summit2024l428/cloud-manager/home.html/program/${id}">
            ${name} <br>
            ${aemId}</a> 
        </td>
        <td>
            <a href="${author}">author</a> <br>
            <a href="${publish}">publish</a>
        </td>
        <td data-value="${envStatus === 'ready'}">${envStatus}</td>
        <td data-value="${status}">${status}</td>
        <td data-value="${edsConfigStatus}">
            <a href="${edsConfigUrl}">${edsConfigCode}</a>
        </td>
        <td data-value="${repoStatus}">
            <a href="${url}">seat${name.replace('L428 ', '')}</a>
        </td>
        <td data-value="${edsStatus}">
            <a href="${edsUrl}">${code}</a>
        </td>
        <td data-value="${zipCodeFdmStatus}">
            <a href="${zipCodeFdmUrl}">${zipCodeFdmCode}</a>
        </td>
        <td data-value="${ccFormStatus}">
            <a href="${publishFormUrl}">${ccFormCode}</a>
        </td>
        <td data-value="${edsCCFormStatus && valid}">
            <a href="${edsCCFormUrl}">${edsCCFormCode}</a><br>
            Form Def Valid - ${valid}
        </td>
        <td data-value="${creditCardDAMAssetStatus && creditCardImageStatus && weFinanceLogoStatus}">
            <a href="${creditCardDAMAssetUrl}">CC DAM - ${creditCardDAMAssetCode}</a> <br>
            <a href="${creditCardImageUrl}"> CC Image - ${creditCardImageCode}</a> <br>
            <a href="${weFinanceLogoUrl}">Logo ${weFinanceLogoCode}</a> <br>
        </td>
    </tr>`;

  return row;
}

async function loadStatus() {
  const response = await fetch('/lab/config.json');
  const data = await response.json();
  const rows = data?.map((record) => renderProgram(record)).join('');
  const tbody = document.getElementById('tbody');
  if (tbody) tbody.innerHTML += rows;
}

async function openPageSpeed(url) {
  window.open(`https://pagespeed.web.dev/analysis?url=${url}&form_factor=mobile`);
}

async function getDetails(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    const number = +document.getElementById('seatNo').value;
    const formattedNumber = String(number).padStart(2, '0');
    const seatNo = `seat${formattedNumber}`;

    const seatNoDisplay = document.getElementById('seatNoDisplay');
    if (seatNoDisplay) seatNoDisplay.textContent = number;
    if (seatMap[seatNo]) {
      const details = seatMap[seatNo];
      Object.keys(details).forEach((key) => {
        const element = document.getElementById(key);
        if (element) {
          if (element.href) element.href = details[key];
          else element.textContent = details[key];
        }
      });
    }
  }
}

loadStatus();
