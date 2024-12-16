import { Prd } from "@/app/constants/types";
import prds from "@app/placeholders/productsList.json";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Sad01Icon } from "hugeicons-react";

export default async function Product({
  params,
}: {
  params: { name: string };
}) {
  const prod: string = (await params).name;

  // Helper to find product by name
  const inquiryProductByName = (name: string) =>
    prds.find((prd) => prd.title.toLowerCase().replaceAll(" ", "-") === name);

  const prd: Prd | undefined = inquiryProductByName(prod);

  return prd ? (
    <Card sx={{ boxShadow: 4 }}>
      <CardHeader
        sx={{ py: 3 }}
        title={prd.title}
        titleTypographyProps={{ variant: "h4" }}
        action={
          <Typography variant="h5" sx={{ color: "primary.main" }}>
            $ {prd.price}
          </Typography>
        }
      />
      <CardMedia
        sx={{
          height: 600,
          borderRadius: 1,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        image={prd.image}
        title={prd.title}
      />
      <CardContent>
        <Typography variant="h6" color="textPrimary">
          Summary
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ lineHeight: 1.8, mt: 1 }}
        >
          {prd.summary}
        </Typography>
        <Typography sx={{ mt: 3 }} variant="h6" color="textPrimary">
          Description
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ lineHeight: 1.8, mt: 1 }}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit veniam
          incidunt eos laborum. Iusto pariatur ipsum adipisci voluptatibus illum
          ab blanditiis! Dolorum, distinctio magni. Earum delectus laboriosam
          animi dignissimos. Molestiae debitis minima impedit suscipit at autem
          minus excepturi tempore? Dignissimos architecto mollitia quis quasi
          incidunt quam fugit, necessitatibus, ipsa et aliquam, saepe magni
          laborum facere eius natus! Tempore, facere accusantium sit explicabo
          quaerat asperiores ratione, unde rerum ducimus amet qui optio
          provident magnam laudantium adipisci impedit voluptatibus? Voluptatem
          cupiditate expedita delectus autem quis fuga voluptatum veniam. Autem
          ratione recusandae dolore aperiam perspiciatis accusantium, neque
          cumque commodi quae minus doloribus ducimus accusamus. Esse laboriosam
          suscipit nostrum ipsam. Voluptatem odit recusandae deleniti?
          Reiciendis excepturi beatae vel saepe, culpa ipsum tempora suscipit
          nisi fugit ea ratione sunt eaque deserunt eligendi fugiat deleniti
          quae sapiente eum libero! Similique unde quae facere rem enim corrupti
          omnis nihil, illo, architecto sequi, iure corporis nesciunt suscipit
          fugiat voluptates minus a inventore doloribus ab rerum veritatis iusto
          molestias! Harum, explicabo sed. Recusandae aut blanditiis molestiae
          voluptatum ipsa minima? Iusto in labore voluptatibus expedita omnis
          consectetur accusantium inventore laudantium nam eligendi excepturi
          beatae enim odio ut, molestias provident. Vero omnis, aliquid
          perspiciatis a numquam deleniti error repudiandae quisquam! Quibusdam,
          repellat. Recusandae totam dolorum ratione sit accusantium repellendus
          atque, odit culpa impedit deserunt non fuga et distinctio omnis neque
          dicta accusamus vel amet voluptate officia reiciendis, at, quasi
          debitis rem! Sunt tempore, officia dignissimos enim aliquam cumque
          quaerat exercitationem dolor autem modi? Voluptas quo nostrum quas ut
          deleniti eos nesciunt enim fugiat a? Deleniti reiciendis, amet at
          porro rerum, natus, laboriosam esse sunt omnis officia eius aliquid
          maiores hic! Magnam ducimus vel consequatur hic quasi saepe!
          Voluptatum sed doloribus incidunt dolorem soluta molestias et debitis
          iste consequatur rem voluptatem rerum officiis, ut enim quos
          necessitatibus ex consectetur, magni sint esse, perferendis est
          dolorum. Corrupti laborum nobis hic, illo harum cum? Facere minus iure
          soluta rem doloribus ab sint quam ea fugiat, nemo maiores perspiciatis
          impedit asperiores modi sunt facilis inventore molestiae pariatur
          cumque possimus id, temporibus ex? Corporis expedita praesentium velit
          possimus aperiam dicta officia enim quae atque voluptates! Eius amet
          modi vero dolorem perferendis dolorum tenetur beatae accusantium
          molestias deserunt itaque quod, ut atque maxime! Praesentium,
          exercitationem, cupiditate veritatis soluta pariatur eum enim optio
          nihil ad consectetur veniam adipisci blanditiis, alias nam delectus
          illum porro. Reiciendis perferendis ratione incidunt quae sunt aliquam
          iusto corporis illum voluptatibus, aperiam fugiat. Saepe voluptate
          provident magni assumenda facere voluptatem in amet dicta, possimus
          eius! Eos iusto alias quaerat eius consequuntur ipsum magni dolores
          ut, optio nihil numquam sequi commodi delectus ipsam vitae, a quidem
          tempora ab animi, doloribus deleniti beatae. Harum quia aut veniam
          blanditiis hic distinctio ipsum assumenda deserunt totam id
          repellendus tempore ex dolore velit voluptatum inventore repellat
          debitis sapiente dolorem, praesentium quasi! Atque quisquam minus iste
          voluptates commodi incidunt, obcaecati sint, hic aliquam in accusamus
          necessitatibus. Illum natus repudiandae molestias veniam numquam
          voluptate maiores corrupti nesciunt blanditiis iste, doloribus
          incidunt vitae eaque veritatis cum perferendis suscipit officia
          consequatur doloremque fuga?
        </Typography>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          spacing={2}
          mt={2}
          py={3}
        >
          <Chip
            label={`In Stock: ${prd.quantity}`}
            color={prd.quantity > 5 ? "success" : "warning"}
            variant="filled"
          />
          <Chip label={`Rating: ${prd.score} / 5`} color="success" variant="outlined" />
        </Stack>
      </CardContent>
    </Card>
  ) : (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" color="error">
        <Sad01Icon size={36} />
      </Typography>
      <Typography variant="h5" color="error">
        Product not found.
      </Typography>
    </Box>
  );
}
