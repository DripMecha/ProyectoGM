import { Component } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Banner } from '../../shared/banner/banner';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-metodologia',
  imports: [Navbar, Banner, Footer],
  templateUrl: './metodologia.html',
  styleUrl: './metodologia.scss',
})
export class MetodologiaComponent {}
