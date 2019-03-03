// from ag-grid
declare var agGrid;


class Gridomancer {
  el: Element;
  filter: Element;



  setEl(element: Element) {
    this.el = element;
    return this;
  }

  setFilter(element: Element) {
    this.filter = element;
    element.addEventListener("input", ev => {



    })
    return this;

  }

  mountDefaults() {
    this.setFilter(document.querySelector("#gridomancer-quickfilter"));
    this.setEl(document.querySelector("#gridomancer-grid"));
    return this;
  }

  loadUrl(url: string) {
    fetch(url)
      .then(r => r.json())
      .then(resp => formatResponse(resp, this.el));
  }

  loadByQueryParam(paramName: string) {
    const params = new URLSearchParams(document.location.search);
    const url = params.get(paramName);
    if (url) {
        const decoded = decodeURIComponent(url);
        this.loadUrl(decoded);
    }
  }

}

function formatResponse(resp: { Header; Rows;}, element: Element) {
  console.log(resp);
  const headerArr = resp.Header;
  const coldefs = headerArr.map(rh => ({
    headerName: rh,
    field: rh
  }));

  const rows = resp.Rows.map(row => {
    const r = {};
    for (let i = 0; i < headerArr.length; i++) {
      r[headerArr[i]] = row[i];
    }
    return r;
  });

  const gridOptions = {
    defaultColDef: {
      filter: true,
      sortable: true,
      resizable: true,

    },
    columnDefs: coldefs,
    rowData: rows
  };
  //console.log('rows', rows)

  new agGrid.Grid(element, gridOptions);
}
// exposed as global
window['Gridomancer'] = Gridomancer;
