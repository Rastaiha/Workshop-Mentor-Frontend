import {
  Grid,
  Link,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import {
  getAllRegistrationReceiptsAction,
} from '../../redux/slices/events';

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: 'absolute',
    right: theme.spacing(2),
    zIndex: 5,
  },
  cardHolder: {
  },
}));

function Index({
  getAllRegistrationReceipts,
  allRegistrationReceipts,
  registrationFormId,
}) {

  useEffect(() => {
    if (allRegistrationReceipts?.length == 0 && registrationFormId) {
      getAllRegistrationReceipts({ registrationFormId })
    }
  }, [allRegistrationReceipts, registrationFormId, getAllRegistrationReceipts])

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>شناسه</TableCell>
                <TableCell>نام</TableCell>
                <TableCell>پایه</TableCell>
                <TableCell>وضعیت</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allRegistrationReceipts?.map((registrationReceipt, index) =>
                <TableRow key={index}>
                  <TableCell>{registrationReceipt?.id}</TableCell>
                  <TableCell >
                    <a as={Link} href={'/registration_receipt/' + registrationReceipt?.id}>{`${registrationReceipt?.first_name} ${registrationReceipt?.last_name}`}</a>
                  </TableCell>
                  <TableCell>
                    {registrationReceipt?.school_studentship?.grade}
                  </TableCell>
                  <TableCell>
                    {registrationReceipt?.status}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {/* <Grid item>
            <Pagination
              count={totalNumberOfPages}
              page={currentPage}
              onChange={handlePaginationChange}
              hidePrevButton hideNextButton
            />
          </Grid> */}
    </Grid >
  );
}
const mapStateToProps = (state) => ({
  articles: state.mentor.articles,
  registrationFormId: state.events.event?.registration_form,
  allRegistrationReceipts: state.events.allRegistrationReceipts || [],
});

export default connect(
  mapStateToProps,
  {
    getAllRegistrationReceipts: getAllRegistrationReceiptsAction,
  }
)(Index);
