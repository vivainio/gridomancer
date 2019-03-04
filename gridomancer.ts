// from ag-grid
declare var agGrid;

class Gridomancer {
  el: Element;
  filter: HTMLInputElement;
  grid: any;
  gridApi: {
    autoSizeColumns: any;
    resizeColumnsToFit: any;
    setQuickFilter: any;

  };
  onGridReady;
  gridOptions: {
    onGridReady;
    defaultColDef: { filter: boolean; sortable: boolean; resizable: boolean };
    columnDefs: any;
    rowData: any;
  };

  setEl(element: Element) {
    this.el = element;
    return this;
  }

  setFilter(element: HTMLInputElement) {
    this.filter = element;
    element.addEventListener("input", ev => {
      if (this.gridApi)
        this.gridApi.setQuickFilter(this.filter.value);
    });
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
      .then(resp => {
        this.grid = this.startWithData(resp, this.el);
      });
  }

  loadByQueryParam(paramName: string) {
    const params = new URLSearchParams(document.location.search);
    const url = params.get(paramName);
    if (url) {
      const decoded = decodeURIComponent(url);
      this.loadUrl(decoded);
    }
  }

  private startWithData(resp: { Header; Rows }, element: Element) {
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

    this.gridOptions = {
      defaultColDef: {
        filter: true,
        sortable: true,
        resizable: true
      },
      columnDefs: coldefs,
      rowData: rows,
      onGridReady: (ev) => {
        this.gridApi = ev.api
        this.gridApi.autosizeColumns();
      }
    };
    new agGrid.Grid(element, this.gridOptions);
  }
}

window["Gridomancer"] = Gridomancer;
