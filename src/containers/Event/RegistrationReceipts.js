import {
  Button,
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

import {
  getAllRegistrationReceiptsAction,
} from '../../redux/slices/events';
import { faSeri, toPersianNumber } from '../../utils/translateNumber';

const STATUS = {
  Waiting: 'منتظر',
  Accepted: 'پذیرفته‌شده',
  Rejected: 'پذیرفته‌‌نشده',
}

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
                <TableCell align='center'>شناسه</TableCell>
                <TableCell align='center'>نام</TableCell>
                <TableCell align='center'>پایه</TableCell>
                <TableCell align='center'>وضعیت</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allRegistrationReceipts?.slice().sort((a, b) => { return a.id > b.id ? -1 : 1 }).map((registrationReceipt, index) =>
                <TableRow key={index}>
                  <TableCell align='center'>
                    {toPersianNumber(registrationReceipt?.id)}
                  </TableCell>
                  <TableCell align='center'>
                    <Button
                      href={'/registration_receipt/' + registrationReceipt?.id}
                      component="a" target="_blank">
                      {(registrationReceipt?.first_name && registrationReceipt?.last_name) ? `${registrationReceipt?.first_name} ${registrationReceipt?.last_name}` : 'بی‌نام'}
                    </Button>
                  </TableCell>
                  <TableCell align='center'>
                    {faSeri(registrationReceipt?.school_studentship?.grade)}
                  </TableCell>
                  <TableCell align='center'>
                    {STATUS[registrationReceipt?.status]}
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
