const SELECTION_KEYS = {
  procedureName: 'ggo_local_procedure_name',
  procedureSlug: 'ggo_local_procedure_slug',
  procedureId: 'ggo_local_procedure_id',
  siteName: 'ggo_local_site_name',
  siteSlug: 'ggo_local_site_slug',
  siteId: 'ggo_local_site_id',
};

type ProcedureSelection = {
  name: string;
  slug?: string;
  id?: string;
};

type SiteSelection = {
  name: string;
  slug?: string;
  id?: string;
};

export const selectionChangeEvent = 'ggo-selection-change';

export function dispatchSelectionChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(selectionChangeEvent));
  }
}

export function saveProcedureSelection(selection: ProcedureSelection) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SELECTION_KEYS.procedureName, selection.name);
  localStorage.setItem(SELECTION_KEYS.procedureSlug, selection.slug || '');
  localStorage.setItem(SELECTION_KEYS.procedureId, selection.id || '');
  dispatchSelectionChange();
}

export function saveSiteSelection(selection: SiteSelection) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SELECTION_KEYS.siteName, selection.name);
  localStorage.setItem(SELECTION_KEYS.siteSlug, selection.slug || '');
  localStorage.setItem(SELECTION_KEYS.siteId, selection.id || '');
  dispatchSelectionChange();
}

export function loadSelection() {
  if (typeof window === 'undefined') {
    return {
      procedure: '',
      procedureSlug: '',
      procedureId: '',
      site: '',
      siteSlug: '',
      siteId: '',
    };
  }

  return {
    procedure: localStorage.getItem(SELECTION_KEYS.procedureName) || '',
    procedureSlug: localStorage.getItem(SELECTION_KEYS.procedureSlug) || '',
    procedureId: localStorage.getItem(SELECTION_KEYS.procedureId) || '',
    site: localStorage.getItem(SELECTION_KEYS.siteName) || '',
    siteSlug: localStorage.getItem(SELECTION_KEYS.siteSlug) || '',
    siteId: localStorage.getItem(SELECTION_KEYS.siteId) || '',
  };
}
