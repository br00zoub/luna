/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */

import { useState, useEffect } from 'react';
import { PACKAGE_GROUPS } from 'constants/AppConstants';

const getFiltered = (data, filters) => {
  const groups = Object.keys(PACKAGE_GROUPS);
  console.log(filters);
  const withFiltersData = filters.reduce((acc = [], filterDetails) => {
    const { filterType, filterValue } = filterDetails;

    const filtered =
      data &&
      data.filter(pkg => {
        const { name } = pkg;

        if (groups.indexOf(filterValue) > -1) {
          return pkg.__group === filterValue;
        }

        if (filterType === 'name' && filterValue) {
          return name.indexOf(filterValue) > -1;
        }

        return pkg[filterValue];
      });

    console.log(filtered);
    return acc.concat(filtered);
  }, []);

  return withFiltersData;
};

const useFilters = (allData, filters, force) => {
  const [filtered, applyFilters] = useState(allData);

  useEffect(() => {
    const withFiltersPackages =
      filters && filters.length ? getFiltered(allData, filters) : allData;

    if (Array.isArray(withFiltersPackages)) {
      applyFilters(withFiltersPackages);
    }
  }, [filters, force]);

  return [filtered];
};

export default useFilters;
