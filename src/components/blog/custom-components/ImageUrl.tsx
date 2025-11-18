interface Props {
  imageUrl?: string;
  href?: string;
  alt?: string;
}

export default function ImageLink({
  imageUrl = 'https://placehold.co/864x100?text=brak-zdjecia',
  href = '/',
  alt = '',
}: Props) {
  return (
    <a href={href}>
      <img src={imageUrl} alt={alt} />
    </a>
  );
}
