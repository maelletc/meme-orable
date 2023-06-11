import logo from '../data/Picture2.jpg';
import logo2 from '../data/essai1.jpg';
import logo3 from '../data/logo3.jpg';

export const photoList = [
	{
		id:1,
		lien: logo,
		utilisateur: 'Patrick',
		hour: '1ed',
		time: '2023-05-31T14:12:50',
		spend: '00s',
		description:'Trop fun les 24',
		afficher: false,
		like: 0
	},{
		id:2,
		lien: logo2,
		utilisateur: 'Momo',
		hour: '1ed',
		time: '2023-05-31T15:55:00',
		spend: '10s',
		afficher: false,
		like: 0
	},{
		id:3,
		lien: logo3,
		utilisateur: 'Max',
		hour: '1ed',
		time: '2023-05-31T15:55:00',
		spend: '10s',
		afficher: false,
		like: 0
	}
]
//pseudo
//description
//picturepath
//like
//timedebut
//timefin
//https://www.digitalocean.com/community/tutorials/react-axios-react-fr#etape-2-faire-une-requete-get