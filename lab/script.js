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
    creditCardForm: { status: creditCardFormStatus, url: creditCardFormUrl, code: creditCardFormCode },
    creditCardDAMAsset: { status: creditCardDAMAssetStatus, url: creditCardDAMAssetUrl, code: creditCardDAMAssetCode },
    creditCardImage: { status: creditCardImageStatus, url: creditCardImageUrl, code: creditCardImageCode },
    weFinanceLogo: { status: weFinanceLogoStatus, url: weFinanceLogoUrl, code: weFinanceLogoCode },
    edsStatus: { status: edsStatus, url: edsUrl, code },
    edsConfig: { status: edsConfigStatus, url: edsConfigUrl, value: edsConfigCode },
  } = healthchecks;
  const number = name.replace('L428 ', '');
  const seatNo = `seat${number}`;
  seatMap[seatNo] = {
    gitUrl: `https://github.com/l428/${seatNo}`,
    author,
    username: `L428+${number}@adobeeventlab.com`,
    publishFormUrl: `${publish}/content/forms/af/we-finance-credit-card-application.html`,
    edsFormUrl: `https://main--${seatNo}--l428.hlx.page/content/forms/af/we-finance-credit-card-application`,
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
            <a href="${url}">${seatNo}</a>
        </td>
        <td data-value="${edsStatus}">
            <a href="${edsUrl}">${code}</a>
        </td>
        <td data-value="${zipCodeFdmStatus}">
            <a href="${zipCodeFdmUrl}">${zipCodeFdmCode}</a>
        </td>
        <td data-value="${creditCardFormStatus}">
            <a href="${creditCardFormUrl}">${creditCardFormCode}</a>
        </td>
        <td data-value="${creditCardDAMAssetStatus}">
            <a href="${creditCardDAMAssetUrl}">${creditCardDAMAssetCode}</a>
        </td>
        <td data-value="${creditCardImageStatus}">
            <a href="${creditCardImageUrl}">${creditCardImageCode}</a>
        </td>
        <td data-value="${weFinanceLogoStatus}">
            <a href="${weFinanceLogoUrl}">${weFinanceLogoCode}</a>
        </td>
    </tr>`;

  return row;
}

async function loadStatus() {
  const response = await fetch('/lab/config.json');
  const data = await response.json();
  const rows = data?.map((record) => renderProgram(record)).join('');
  const table = document.getElementById('tbody');
  if (table) {
    table.innerHTML = rows;
  }
}

async function getDetails(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    const number = +document.getElementById('seatNo').value;
    const formattedNumber = String(number).padStart(2, '0');
    const seatNo = `seat${formattedNumber}`;
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
