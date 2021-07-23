import Chip from '@material-ui/core/Chip';
import Stack from '@material-ui/core/Stack';

export default function ColorChips(): JSX.Element {
  return (
    <Stack spacing={1} alignItems="center">
      <Stack direction="row" spacing={1}>
        <Chip onClick={() => {}} label="korean" color="warning" />
        <Chip label="japanese" color="secondary" />
      </Stack>
      <Stack direction="row" spacing={1}>
        <Chip label="mexican" color="warning" variant="outlined" />
        <Chip label="fastfood" color="secondary" variant="outlined" />
      </Stack>
    </Stack>
  );
}
