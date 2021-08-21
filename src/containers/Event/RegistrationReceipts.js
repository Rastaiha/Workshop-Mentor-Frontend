import {
  Grid,
  IconButton,
  Link,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { AddCircle as AddCircleIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import CreateArticleDialog from '../../components/Dialog/CreateArticleDialog/CreateArticleDialog';
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
  const classes = useStyles();
  const t = useTranslate();

  console.log(allRegistrationReceipts)

  useEffect(() => {
    if (allRegistrationReceipts?.length == 0 && registrationFormId) {
      getAllRegistrationReceipts({ registrationFormId })
    }
  }, [allRegistrationReceipts, registrationFormId, getAllRegistrationReceipts])

  const [openCreateArticleDialog, setOpenCreateArticleDialog] = useState(false);

  return (
    <Grid container spacing={2} justify='center'>
      <Grid item container xs={12} md={8} direction='column' spacing={2}>
        <Grid item>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>شناسه</TableCell>
                  <TableCell>نام</TableCell>
                  <TableCell>موضوعات اصلی</TableCell>
                  <TableCell>درجه سختی</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allRegistrationReceipts?.map((registrationReceipt, index) =>
                  <TableRow key={index}>
                    <TableCell>{"ssasa"}</TableCell>
                    <TableCell >
                      <a as={Link} href={'/registration_receipt/' + registrationReceipt.id}>{"problem.name"}</a>
                    </TableCell>
                    <TableCell>

                    </TableCell>
                    <TableCell></TableCell>
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
      </Grid>
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
